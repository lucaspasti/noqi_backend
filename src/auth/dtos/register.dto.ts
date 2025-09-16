import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail() email: string;
  @IsOptional() @IsString() name: string;
  @IsString() @MinLength(8) password: string;
}
