import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers() {
    try {
      const users = await this.prismaService.user.findMany();
      return users;
    } catch (e) {}
  }
}
