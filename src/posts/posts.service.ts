import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { StorageService } from '../storage/storage.service';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import * as process from 'process';

const bucketName = 'zarablogbucket';
@Injectable()
export class PostsService {
  constructor(
    private prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}
  async create(
    file: Express.Multer.File,
    createPostDto: CreatePostDto,
    user: any,
  ) {
    try {
      const newPost = {
        id: uuidv4(),
        title: createPostDto.title,
        content: createPostDto.content,
        read_time: Number(createPostDto.read_time),
      };
      let filename: string;

      await Promise.all([
        createPostDto.category.map((categoryId) => {
          return this.createCategoriesOnPosts(newPost.id, Number(categoryId));
        }),
      ]);

      if (file) {
        filename = Date.now() + file.originalname;
        await this.storageService.upload(filename, file.buffer, bucketName);
      }

      return this.prismaService.post.create({
        data: {
          ...newPost,
          author: {
            connect: {
              id: user.sub,
            },
          },
          cover_photo: ` ${process.env.MINIO_S3_URL}/${bucketName}/${filename} `,
        },
        include: {
          category: true,
          tag: true,
          author: {
            select: {
              firstname: true,
              lastname: true,
              email: true,
              avatar: true,
            },
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(current_page: number, per_page: number, filter_by: string) {
    try {
      const skip = current_page * per_page;
      const take = Number(per_page);
      const filter = filter_by == 'all' ? undefined : filter_by;
      return await this.prismaService.post.findMany({
        skip,
        take,
        where: {
          category: {
            some: {
              category: {
                name: filter,
              },
            },
          },
        },
        include: {
          category: {
            include: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
          tag: {
            include: {
              tag: {
                select: {
                  designation: true,
                  id: true,
                },
              },
            },
          },
          reaction: {
            include: {
              reaction: {
                select: {
                  type: true,
                },
              },
            },
          },
          review: {
            select: {
              weight: true,
              reviewer_id: true,
              id: true,
            },
          },
          author: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              avatar: {
                select: {
                  path: true,
                },
              },
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException(
        'An error occurred while processing your request.',
      );
    }
  }

  //todo: move to category module later
  async findAllCategories() {
    try {
      return await this.prismaService.category.findMany();
    } catch (e) {
      throw new InternalServerErrorException(
        'An error occurred while processing your request.',
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const updatedData = new UpdatePostDto(updatePostDto);
    try {
      await this.prismaService.post.update({
        data: {
          ...updatedData,
        },
        where: {
          id,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  async updatePostBannerUrl(file: Express.Multer.File, postId: string) {
    try {
      //Todo: check if post have previous cover photo , if any , delete it from s3
      const filename: string = file.originalname + Date.now();
      await this.storageService.upload(filename, file.buffer, bucketName);
      return this.prismaService.post.update({
        data: {
          cover_photo: `${process.env.MINIO_S3_URL}/${bucketName}/${filename}`,
        },
        where: {
          id: postId,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  remove(id: string) {
    try {
      return this.prismaService.post.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  async createCategoriesOnPosts(post_id: string, category_id: number) {
    return this.prismaService.categoriesOnPosts.create({
      data: {
        category_id: category_id,
        post_id: post_id,
      },
    });
  }
  async reactOnPost(reaction_id: number, post_id: string, user_id: string) {
    try {
      const existingReaction =
        await this.prismaService.reactionsOnPosts.findFirst({
          where: {
            post_id: post_id,
            user_id: user_id,
          },
        });
      console.log(existingReaction);
      if (existingReaction) {
        return await this.prismaService.reactionsOnPosts.delete({
          where: {
            post_id_reaction_id_user_id: {
              post_id: post_id,
              user_id: user_id,
              reaction_id: existingReaction.reaction_id,
            },
          },
        });
      }
      return this.prismaService.post.update({
        data: {
          reaction: {
            create: {
              user: {
                connect: {
                  id: user_id,
                },
              },
              reaction: {
                connectOrCreate: {
                  where: { id: reaction_id },
                  create: {
                    id: reaction_id,
                    type: 'like',
                  },
                },
              },
            },
          },
        },
        where: {
          id: post_id,
        },
        include: {
          reaction: true,
          category: true,
          tag: true,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  async reviewOnPost(reviewerId: string, postId: string, weight: number) {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          review: true,
        },
      });
      if (!post) {
        //todo: implement normalize error
        return new NotFoundException('Post not found');
      }
      const existingUserReviewOnPost = post.review.filter(
        (review) => review.reviewer_id === reviewerId,
      );
      if (existingUserReviewOnPost.length == 0) {
        await this.createUserReviewOnPost(reviewerId, postId, weight);
      } else {
        await this.updateReviewOfUserOnPost(
          existingUserReviewOnPost[0].id,
          weight,
        );
      }
      const postReviews = await this.prismaService.review.findMany({
        where: {
          post_id: postId,
        },
      });
      const numbersOfReviews = postReviews.length;
      const arrayOfReviewWeight = postReviews.map((review) => review.weight);
      const reviewAverage = await this.calculateReviewAverage(
        arrayOfReviewWeight,
        numbersOfReviews,
      );
      console.log(reviewAverage);
      return await this.prismaService.post.update({
        data: {
          review_average: reviewAverage,
        },
        where: {
          id: postId,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  async calculateReviewAverage(
    arrayOfReviewWeights: number[],
    numbersOfReviews: number,
  ) {
    const totalReviewWeight = arrayOfReviewWeights.reduce(
      (totalReview, currentReview) => totalReview + currentReview,
    );
    console.log('totalReviewWeight :', totalReviewWeight);
    console.log('numbersOfReviews', numbersOfReviews);
    if (totalReviewWeight <= 0) {
      return 0;
    }
    return totalReviewWeight / numbersOfReviews;
  }
  async updateReviewOfUserOnPost(reviewId: number, weight: number) {
    return this.prismaService.review.update({
      data: {
        weight: weight,
      },
      where: {
        id: reviewId,
      },
    });
  }
  async createUserReviewOnPost(
    reviewerId: string,
    postId: string,
    weight: number,
  ) {
    return this.prismaService.review.create({
      data: {
        reviewer: {
          connect: {
            id: reviewerId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
        weight: weight,
      },
    });
  }
}
