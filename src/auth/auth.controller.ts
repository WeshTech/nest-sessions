import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { AuthGuard } from '@nestjs/passport';
import { localGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(localGuard)
  login(@Body() loginDto: LoginDto) {
    const user = this.authService.validateUser(loginDto);
    if (!user) throw new HttpException('Invalid Credentials', 401);
    return user;
  }
}
