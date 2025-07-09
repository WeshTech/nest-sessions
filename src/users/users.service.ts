import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/registration.schema';
import { RegisterUserDto } from './dtos/register.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const existingUser = await this.userModel.findOne({
      email: registerUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException('Email in use or Account Blocked');
    }

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    const createdUser = await this.userModel.create({
      email: registerUserDto.email,
      password: hashedPassword,
      business: registerUserDto.business,
    });

    const { password, ...result } = createdUser.toJSON();
    return result;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }
}
