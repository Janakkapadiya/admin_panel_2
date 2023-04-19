import { PostRepository } from 'src/domain/interface/PostRepository';
import { ILogger } from 'src/domain/logger/Logger.interface';

export class deletePostUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly postRepository: PostRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return await this.postRepository.deletePost(id);
  }
}
