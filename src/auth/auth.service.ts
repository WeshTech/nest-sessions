import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/Login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { userInterface } from './interfaces/user.interface';
import { SessionsService } from 'src/sessions/sessions.service';
import { Schema } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private sessionService: SessionsService,
  ) {}

  async validateUser({ email, password }: LoginDto) {
    const user = await this.userService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null; // Invalid credentials
    }

    // Optional: Check for existing session (if you want to block concurrent logins)
    if (user.activeSessionId) {
      const validSessionId = new Schema.Types.ObjectId(user.activeSessionId);
      const existingSession =
        await this.sessionService.findSessionById(validSessionId);
      if (existingSession) {
        return null; // Prevent login if session exists
      }
    }

    // Return the user object (without sensitive data)
    const { password: _, ...safeUser } = user;
    return safeUser;
  }
  async userLogin(userId: string, sessionId: Schema.Types.ObjectId) {
    return this.userService.updateUserLoginStatus(sessionId, userId);
  }
}
