import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please provide a valid Email.' })
  email: string;

  @IsString()
  password: string;
}
