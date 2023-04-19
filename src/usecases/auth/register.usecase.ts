import { BcryptService } from '../../infrastructure/services/bcrypt/bcrypt.service';
import { UserRepository } from 'src/domain/interface/UserRepository';
import { ILogger } from 'src/domain/logger/Logger.interface';
import { UserM } from 'src/domain/model/UserM';

export class registerUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}
  async execute(user: UserM): Promise<UserM> {
    const the_user = new UserM();
    the_user.name = user.name;
    the_user.email = user.email;
    the_user.password = await this.bcryptService.hash(user.password);
    const result = await this.userRepository.create(the_user);
    this.logger.log('addUserUseCases execute', 'New User have been inserted');
    return result;
  }
}
