import { ApiProperty } from '@nestjs/swagger';
import { UserM } from 'src/domain/model/UserM';

export class UserPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  password: string;

  constructor(user: UserM) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
    this.password = user.password;
  }
}
