import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { StorageService } from '../storage/storage.service';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';


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
        const bucketName = 'zarablogbucket';
        await this.storageService.upload(filename, file.buffer, bucketName);
      }
      return this.prismaService.post.create({
        data: {
          authorId: user.sub,
          ...newPost,
          cover_photo: filename,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  findAll() {
    return this.prismaService.post.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
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
}
