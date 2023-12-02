import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from '../lib/decorator/user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: any,
  ) {
    return this.postsService.create(file, createPostDto, user);
  }
  @Get()
  findAll(@Query('skip') skip: number, @Query('take') take: number) {
    return this.postsService.findAll(skip, take);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }
  @Patch(':id/react')
  reactOnPost(
    @Param('id') postId: string,
    @Query('reaction') reactionId: number,
    @GetUser() user: any,
  ) {
    console.log(postId, reactionId, user);
    return this.postsService.reactOnPost(Number(reactionId), postId, user.sub);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
