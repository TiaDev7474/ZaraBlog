import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: UserCreateDto) {
    return this.authService.signup(createUserDto);
  }
  @Post('login')
  login() {
    return this.authService.login();
  }
}
