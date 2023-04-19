import { UserRepository } from 'src/domain/interface/UserRepository';
import { ILogger } from 'src/domain/logger/Logger.interface';
import { UserM } from 'src/domain/model/UserM';

export class getUserByIdUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}
  async execute(id: number): Promise<UserM> {
    const result = await this.userRepository.getById(id);
    this.logger.log('getUserById execute', 'got user as per requested id');
    return result;
  }
}
