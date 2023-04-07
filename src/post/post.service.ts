import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatepostDto } from './dto/create.post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(
    userId: number,
    createPostDto: CreatepostDto,
  ): Promise<Post> {
    const Post = await this.prismaService.post.create({
      data: {
        ...createPostDto,
        userId,
      },
    });
    return Post;
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    try {
      return await this.prismaService.post.findMany({ where: { userId } });
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.prismaService.post.findMany();
    if (posts.length === 0) {
      throw new NotFoundException('No posts found');
    }
    return posts;
  }

  async deletePostByUserId(userId: number, id: number): Promise<void> {
    const Post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
    if (!Post || Post.userId != userId) {
      throw new Error('Post not found.');
    }
    await this.prismaService.post.delete({
      where: {
        id,
      },
    });
  }
}
