import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { LocalAuthGuard } from './utils/localGuard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { Schema } from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request) {
    console.log({ decodedUser: req.user });
    await this.authService.userLogin(
      req.user as unknown as string,
      req.sessionID as unknown as Schema.Types.ObjectId,
    );
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles('owner')
  status(@Req() req: Request) {}
}
