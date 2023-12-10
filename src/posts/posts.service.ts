import { Injectable, NotFoundException } from '@nestjs/common';
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

  findAll(skip?: number, take?: number) {
    return this.prismaService.post.findMany({
      skip,
      take,
      include: {
        category: {
          include: {
            category: true,
          },
        },
        tag: {
          include: {
            tag: true,
          },
        },
        reaction: true,
        review: true,
      },
    });
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
      console.log(reviewerId);
      console.log(existingUserReviewOnPost.length);
      if (existingUserReviewOnPost.length == 0) {
        console.log('here');
        return await this.prismaService.review.create({
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
          include: {
            reviewer: true,
            post: true,
          },
        });
      }
      return await this.prismaService.review.update({
        data: {
          weight: weight,
        },
        where: {
          id: existingUserReviewOnPost[0].id,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}
