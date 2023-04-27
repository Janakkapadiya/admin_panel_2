import { UserRepository } from 'src/domain/interface/UserRepository';

import { UserM } from 'src/domain/model/UserM';

export class getUsersUseCases {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(): Promise<UserM[]> {
    return await this.userRepository.findAll();
  }
}
