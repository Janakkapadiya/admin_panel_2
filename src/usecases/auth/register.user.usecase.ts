import { UserRepository } from 'src/domain/interface/UserRepository';
import { UserM } from 'src/domain/model/UserM';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';

export class RegisterUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
    private readonly bcrypt: BcryptService,
  ) {}

  async execute(user: UserM): Promise<UserM> {
    const hashedPassword = await this.bcrypt.hash(user.password);
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      this.exceptionsService.forbiddenException({
        message: 'can not create use as user with is name already exists',
        code_error: 403,
      });
    }
    return await this.userRepository.register({
      ...user,
      password: hashedPassword,
    });
  }
}
