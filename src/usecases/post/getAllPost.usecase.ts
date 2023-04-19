import { PostRepository } from 'src/domain/interface/PostRepository';
import { ILogger } from 'src/domain/logger/Logger.interface';
import { PostM } from 'src/domain/model/PostsM';

export class getAllPostUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly postRepository: PostRepository,
  ) {}

  async execute(): Promise<PostM[]> {
    return await this.postRepository.getAllPosts();
  }
}
