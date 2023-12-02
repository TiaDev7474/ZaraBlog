import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  read_time: string;
  @IsArray()
  tags: string[];
  @IsArray()
  category: string[];
}
