import { UserRepository } from 'src/domain/interface/UserRepository';
import { ILogger } from 'src/domain/logger/Logger.interface';
import { UserM } from 'src/domain/model/UserM';

export class deleteUserUseCases {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(email: string): Promise<UserM> {
    const result = await this.userRepository.getByEmail(email);
    return result;
  }
}
