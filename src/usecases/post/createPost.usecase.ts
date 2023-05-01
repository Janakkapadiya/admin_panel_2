import { PostRepository } from 'src/domain/interface/PostRepository';
import { ILogger } from 'src/domain/logger/Logger.interface';
import { PostM } from 'src/domain/model/PostsM';

export class CreatePostUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly postRepository: PostRepository,
  ) {}

  async execute(userId: number, post: PostM): Promise<PostM> {
    const result = await this.postRepository.createPost(userId, post);
    this.logger.log('addTodoUseCases execute', 'New todo have been inserted');
    return result;
  }
}
