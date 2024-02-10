import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll(query?: string) {
    return this.prismaService.category.findMany({
      take: 5,
      where: {
        OR: [
          {
            designation: {
              startsWith: query,
            },
          },
          {
            designation: {
              endsWith: query,
            },
          },
          {
            designation: {
              contains: query,
            },
          },
        ],
      },
      select: {
        designation: true,
        id: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
