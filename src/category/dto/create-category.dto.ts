import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  designation: string;
}
