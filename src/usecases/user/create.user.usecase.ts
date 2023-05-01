import { UserRepository } from 'src/domain/interface/UserRepository';
import { UserM } from 'src/domain/model/UserM';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { MailerService } from 'src/infrastructure/services/mail/mailer.service';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
    private readonly emailSendService: MailerService,
  ) {}

  async execute(user: UserM): Promise<UserM> {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      this.exceptionsService.forbiddenException({
        message: 'can not create use as user with is name already exists',
        code_error: 403,
      });
    } else {
      await this.emailSendService.sendEmail(
        user.email,
        'please change your password',
        user.name,
      );
      const create = await this.userRepository.createUser(user);
      console.log('createUser test case -> ', create);
      return create;
    }
  }
}
