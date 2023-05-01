import { IException } from 'src/domain/exceptions/exceptions.interface';
import { UserRepository } from 'src/domain/interface/UserRepository';
import { IBcryptService } from 'src/domain/adepters/bcrypt.interface';

export class UpdateUserPasswordUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly exception: IException,
    private readonly bcrypt: IBcryptService,
  ) {}

  async execute(email: string, password: string) {
    const user = this.userRepo.findByEmail(email);
    if (!user) {
      this.exception.badRequestException({
        message: "user is't present can't reset password",
        code_error: 400,
      });
    } else {
      const hashedPassword = await this.bcrypt.hash(password);
      return this.userRepo.resetPassword(email, hashedPassword);
    }
  }
}
