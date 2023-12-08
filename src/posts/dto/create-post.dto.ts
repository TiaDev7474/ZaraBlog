import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  read_time: number;
  @IsArray()
  tags: number[];
  @IsArray()
  category: number[];
}
