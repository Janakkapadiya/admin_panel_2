import { PostRepository } from 'src/domain/interface/PostRepository';
import { ILogger } from 'src/domain/logger/Logger.interface';
import { PostM } from 'src/domain/model/PostsM';

export class createPostUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly postRepository: PostRepository,
  ) {}

  async execute(title: string, content: string): Promise<PostM> {
    const post = new PostM();
    post.title = title;
    post.content = content;
    const result = await this.postRepository.createPost(post);
    this.logger.log('addTodoUseCases execute', 'New todo have been inserted');
    return result;
  }
}
