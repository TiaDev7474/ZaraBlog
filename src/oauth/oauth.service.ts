import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { oauthDto } from './dto/oauth.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OauthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  generateJwt(payload: { sub: string; email: string }) {
    return this.jwtService.sign(payload);
  }
  async signIn(oauthUserDto: oauthDto) {
    if (!oauthUserDto) {
      throw new BadRequestException('Unauthenticated');
    }
    const userExist = await this.prisma.user.findUnique({
      where: {
        email: oauthUserDto.email,
      },
    });

    if (!userExist) {
      return this.registerUser(oauthUserDto);
    }
    if (userExist.providerName !== oauthUserDto.providerName) {
      throw new BadRequestException('Email already used');
    }
    return this.generateJwt({
      sub: userExist.id,
      email: userExist.email,
    });
  }
  async registerUser(oauthUserDTo: oauthDto) {
    const { avatar, ...user } = oauthUserDTo;
    try {
      const newUser = await this.prisma.user.create({
        data: {
          id: uuidv4(),
          password: '',
          ...user,
          avatar: {
            create: {
              filename: '',
              path: avatar,
            },
          },
        },
      });
      return this.generateJwt({
        sub: newUser.id,
        email: newUser.email,
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
