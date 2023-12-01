import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  content: string;

  @IsNumber()
  read_time: string;

  @IsArray()
  category: string[];

  @IsArray()
  tags: string[];
}
