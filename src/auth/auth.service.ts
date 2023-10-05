import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signup(userCreateDto: UserCreateDto) {
    console.log(userCreateDto);
  }
  login() {}
}
