import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from '../entities/posts.entity';
import { PostRepository } from 'src/domain/interface/PostRepository';
import { PostM } from 'src/domain/model/PostsM';

@Injectable()
export class DatabasePostRepository implements PostRepository {
  constructor(
    @InjectRepository(Posts)
    private readonly todoEntityRepository: Repository<Posts>,
  ) {}

  async createPost(data: PostM): Promise<PostM> {
    const result = await this.todoEntityRepository.insert(data);
    return this.toPosts(result.generatedMaps[0] as Posts);
  }

  async getAllPosts(): Promise<PostM[]> {
    const todoEntity = await this.todoEntityRepository.find();
    return todoEntity.map((todoEntity) => this.toPosts(todoEntity));
  }

  async getPost(userId: number): Promise<PostM> {
    const todoEntity = await this.todoEntityRepository.findOne({
      where: {
        id: userId,
      },
    });
    return this.toPosts(todoEntity);
  }

  async deletePost(userId: number): Promise<void> {
    await this.todoEntityRepository.delete({ id: userId });
  }

  private toPosts(todoEntity: Posts): PostM {
    const todo: PostM = new PostM();

    todo.id = todoEntity.id;
    todo.title = todoEntity.title;
    todo.content = todoEntity.content;
    return todo;
  }
}
