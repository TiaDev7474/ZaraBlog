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
import { SkipAuth } from '../lib/decorator/auth.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('banner_image'))
  create(
    @UploadedFile() banner_image: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: any,
  ) {
    return this.postsService.create(banner_image, createPostDto, user);
  }

  @Get()
  @SkipAuth()
  findAll(
    @Query('filter') filter_by: string,
    @Query('current_page') current_page: string,
    @Query('per_page') per_page: string,
  ) {
    console.log(typeof per_page, typeof current_page);
    return this.postsService.findAll(
      Number(current_page),
      Number(per_page),
      filter_by,
    );
  }

  @Get('/category')
  @SkipAuth()
  findAllCategories() {
    return this.postsService.findAllCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }
  @Patch(':id')
  @UseInterceptors(FileInterceptor('banner_image'))
  update(
    @UploadedFile() banner_image: Express.Multer.File,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }
  @Patch(':id/cover-photo')
  @UseInterceptors(FileInterceptor('banner_image'))
  updatePostCoverPhoto(
    @UploadedFile() banner_image: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.postsService.updatePostBannerUrl(banner_image, id);
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
    return this.postsService.remove(id);
  }
  @Patch(':id/review')
  reviewOnPost(
    @Param('id') id: string,
    @GetUser() user: any,
    @Body('weight') weight: number,
  ) {
    console.log(user);
    return this.postsService.reviewOnPost(user.sub, id, Number(weight));
  }

}
