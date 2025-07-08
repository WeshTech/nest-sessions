import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/Login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const fakeUsers = [
  {
    id: 1,
    username: 'john_doe',
    password: 'Password123!',
  },
  {
    id: 2,
    username: 'jane_smith',
    password: 'SecurePass456',
  },
  {
    id: 3,
    username: 'bob_johnson',
    password: 'MyP@ssw0rd',
  },
];

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  validateUser({ username, password }: LoginDto) {
    const findUser = fakeUsers.find((user) => user.username === username);
    if (!findUser) return null;
    if (password === findUser.password) {
      const { password, ...user } = findUser;
      console.log(this.configService.get<string>('MONGO_URI'));
      return this.jwtService.sign(user);
    }
  }
}
