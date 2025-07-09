import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/Login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { userInterface } from './interfaces/user.interface';
import { User } from 'src/users/schemas/registration.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser({
    email,
    password,
  }: LoginDto): Promise<userInterface | null> {
    const user = await this.userService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, __v, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: userInterface) {
    const payload = {
      email: user.email,
      sub: user._id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
