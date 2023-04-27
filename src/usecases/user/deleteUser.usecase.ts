import { UserRepository } from 'src/domain/interface/UserRepository';
import { UserM } from 'src/domain/model/UserM';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class deleteUserUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}
  async execute(email: string): Promise<UserM> {
    const result = await this.userRepository.findByEmail(email);
    if (!result) {
      this.exceptionsService.badRequestException({
        message: 'no user by this email found',
        code_error: 400,
      });
    }
    return result;
  }
}
