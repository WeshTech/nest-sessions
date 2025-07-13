import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { localGuard } from './guards/local.guard';
import { Request } from 'express';
import { userInterface } from './interfaces/user.interface';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(localGuard)
  async login(@Req() req: Request) {
    if (req.user) {
      const access_token = await this.authService.login(
        req.user as userInterface,
      );
      if (!access_token) {
        throw new UnauthorizedException('Something went wrong');
      }
      return access_token;
    }
  }

  @Get('status')
  @UseGuards(RolesGuard)
  @Roles('admin')
  status(@Req() req: Request) {}
}
