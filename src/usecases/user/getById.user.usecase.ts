import { UserRepository } from 'src/domain/interface/UserRepository';
import { UserM } from 'src/domain/model/UserM';

export class getUserByIdUseCases {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(id: number): Promise<UserM> {
    const result = await this.userRepository.findById(id);
    return result;
  }
}
