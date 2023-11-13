import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { SkipAuth } from '../auth/decorator/auth.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @SkipAuth()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return this.userService.getAllUsers();
  }
}
