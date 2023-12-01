import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';
import { SkipAuth } from '../lib/decorator/auth.decorator';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @SkipAuth()
    @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  @SkipAuth()
  @Post('login')
  signIn(@Body() signInDto: CreateUserDto) {
    return this.authService.signIn(signInDto);
  }
}
