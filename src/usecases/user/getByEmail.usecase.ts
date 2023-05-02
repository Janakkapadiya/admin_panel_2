import { UserRepository } from 'src/domain/interface/UserRepository';
import { UserM } from 'src/domain/model/UserM';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class getUserByEmailUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}
  async execute(email: string): Promise<UserM> {
    const result = await this.userRepository.findByEmail(email);
    if (!result) {
      this.exceptionsService.forbiddenException({
        message: 'no user with this email',
        code_error: 403,
      });
    }
    return result;
  }
}
