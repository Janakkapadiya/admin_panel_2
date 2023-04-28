import { PostRepository } from 'src/domain/interface/PostRepository';
import { PostM } from 'src/domain/model/PostsM';

export class GetAllPostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(): Promise<PostM[]> {
    return await this.postRepository.getAllPosts();
  }
}
