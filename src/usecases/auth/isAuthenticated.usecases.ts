import { IException } from 'src/domain/exceptions/exceptions.interface';
import { UserRepository } from 'src/domain/interface/UserRepository';
import { UserM, UserWithoutPassword } from 'src/domain/model/UserM';

export class IsAuthenticatedUseCases {
  constructor(
    private readonly adminUserRepo: UserRepository,
    private readonly exception: IException,
  ) {}

  async execute(email: string): Promise<UserWithoutPassword> {
    const user: UserM = await this.adminUserRepo.findByEmail(email);
    if (!user) {
      this.exception.UnauthorizedException({
        message: 'this user is not authorized',
        code_error: 401,
      });
    }
    const { password, ...info } = user;
    return info;
  }
}
