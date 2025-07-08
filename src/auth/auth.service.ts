import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/Login.dto';

@Injectable()
export class AuthService {
  validateUser(loginDto: LoginDto) {}
}
