import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Express } from 'express';
import { StorageService } from '../storage/storage.service';
import * as process from 'process';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}
  findAll() {
    return this.prismaService.user.findMany({
      include: {
        avatar: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      include: {
        avatar: true,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
  }
  async setProfilePicture(file: Express.Multer.File, id: string) {
    const filename = Date.now() + file.originalname;
    const buffer = file.buffer;
    const bucketname = 'zarablogbucket';
    await this.storageService.upload(filename, buffer, bucketname);
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        avatar: {
          create: {
            filename: filename,
            path: `${process.env.MINIO_S3_URL}/${bucketname}/${filename}`,
          },
        },
      },
    });
  }
  remove(id: string) {
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
