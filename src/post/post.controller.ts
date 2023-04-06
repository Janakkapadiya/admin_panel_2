import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Post as PostSchema } from '@prisma/client';
import { Role } from 'src/common/enum/role.enum';
import { CookieAuthenticationGuard } from 'src/guard/cookieAuthenticationGuard';
import { RolesGuard } from 'src/guard/roleGuard';
import { Roles } from 'src/user/decorator/role.decorator';
import { CreatepostDto } from './dto/create.post.dto';
import { PostService } from './post.service';

@ApiTags('posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @UseGuards(CookieAuthenticationGuard)
  async createPost(
    @Req() req: any,
    @Body() createPostDto: CreatepostDto,
  ): Promise<PostSchema> {
    if (req.user.role == Role.PowerUser)
      throw new HttpException(`Not Allowed`, HttpStatus.FORBIDDEN);
    return await this.postService.createPost(req.user.id, createPostDto);
  }

  @Get('all')
  @UseGuards(CookieAuthenticationGuard)
  async getMyPosts(@Req() req: any): Promise<PostSchema[]> {
    return await this.postService.getPostsByUserId(req.user.id);
  }

  @Delete(':id')
  @UseGuards(CookieAuthenticationGuard)
  async deleteMyPost(@Req() req: any, @Param('id') id: string): Promise<void> {
    await this.postService.deletePostByUserId(req.user.id, parseInt(id));
  }

  @Roles(Role.PowerUser)
  @Get(':id/posts')
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  async getPostsAllByUserId(@Param('id') id: string): Promise<PostSchema[]> {
    return await this.postService.getPostsByUserId(parseInt(id));
  }
}
