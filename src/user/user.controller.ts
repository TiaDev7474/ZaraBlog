import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../lib/decorator/role.decorator';
import { Role } from '../lib/enums/role';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Roles(Role.ADMIN)
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return this.userService.getAllUsers();
  }
}
