import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class oauthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  providerId: string;

  @IsString()
  @IsNotEmpty()
  providerName: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  firstname: string;
}
