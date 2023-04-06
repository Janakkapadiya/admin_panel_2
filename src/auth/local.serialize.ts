import { PassportSerializer } from '@nestjs/passport';
import { Injectable, SerializeOptions } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';

@SerializeOptions({
  strategy: 'excludeAll',
})
@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersService: UserService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    console.log(user);
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    const user = await this.usersService.getById(Number(userId));
    console.log(user);
    done(null, user);
  }
}
