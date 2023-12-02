import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { StorageService } from '../storage/storage.service';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import * as process from 'process';

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
      const bucketName = 'zarablogbucket';
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
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} ${updatePostDto.content} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  async createCategoriesOnPosts(post_id: string, catergory_id: number) {
    return this.prismaService.categoriesOnPosts.create({
      data: {
        categoryId: catergory_id,
        postId: post_id,
      },
    });
  }

  async reactOnPost(reaction_id: number, post_id: string, user_id: string) {
    try {
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
}
