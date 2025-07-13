import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/users/schemas/registration.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class sessionSerializer extends PassportSerializer {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    console.log({ userInserialize: user });
    done(null, user);
  }

  async deserializeUser(user: User, done: Function) {
    console.log({ userInDecerialize: user });
    done(null, user);
  }
}
