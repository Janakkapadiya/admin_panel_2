import { PostM } from '../model/PostsM';

export interface PostRepository {
  createPost(data: PostM): Promise<PostM>;
  getAllPosts(): Promise<PostM[]>;
  getPost(userId: number): Promise<PostM>;
  deletePost(userId: number): Promise<void>;
}
