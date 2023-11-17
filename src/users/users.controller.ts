import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../lib/decorator/role.decorator';
import { Role } from '../lib/enums/role';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/upload-profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.usersService.setProfilePicture(file, id);
  }
  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
