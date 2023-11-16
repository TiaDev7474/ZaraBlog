import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}
  async signup(userCreateDto: CreateUserDto) {
    const { password, email, ...rest } = userCreateDto;
    console.log(password, email);
    try {
      const hashedPassword = await argon2.hash(password);
      const createdUser = await this.prisma.user.create({
        data: {
          id: uuidv4(),
          email: email,
          password: hashedPassword,
          ...rest,
        },
      });
      await this.mailService.sendUserConfirmation(createdUser);
      console.log(createdUser);
      return createdUser;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == 'P2002') {
          throw new ForbiddenException('Credentials already taken');
        }
      }
      console.log(e);
    }
  }
  async signIn(signInDto: LoginDto) {
    try {
      const foundUser = await this.prisma.user.findUnique({
        where: {
          email: signInDto.email,
        },
      });

      if (!foundUser) {
        return new NotFoundException('User Not found');
      }
      const isPasswordValid = await this.comparePassword(
        signInDto.password,
        foundUser.password,
      );
      if (!isPasswordValid) {
        return new ForbiddenException(FORBIDDEN_MESSAGE);
      }
      const payload = { sub: foundUser.id, email: foundUser.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      //Todo: Handle error exception
      console.log(e.message);
    }
  }
  comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return argon2.verify(hashedPassword, password);
  }
}
