import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiExtraModels } from '@nestjs/swagger';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { CreatePostUseCase } from 'src/usecases/post/createPost.usecase';
import { GetAllPostUseCase } from 'src/usecases/post/getAllPost.usecase';
import { GetPostUseCase } from 'src/usecases/post/getPost.usecase';
import { CreatePostDto } from './post.dto';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { RoleGuard } from 'src/infrastructure/common/guards/roles.guard';
import { Roles } from 'src/infrastructure/common/decoretors/Roles.decoretor';
import { Role } from 'src/domain/enums/Roles.enum';
import { User } from 'src/infrastructure/entities/user.entity';

@Controller('post')
@ApiTags('post')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels()
export class PostController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_POST_USECASES_PROXY)
    private readonly createUserPost: UseCaseProxy<CreatePostUseCase>,
    @Inject(UsecasesProxyModule.GET_POSTS_USECASES_PROXY)
    private readonly getAllPosts: UseCaseProxy<GetAllPostUseCase>,
    @Inject(UsecasesProxyModule.GET_POST_USECASES_PROXY)
    private readonly getUserPost: UseCaseProxy<GetPostUseCase>,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.User)
  async createPost(@Body() createPostDto: CreatePostDto, @Req() request: any) {
    const post = await this.createUserPost
      .getInstance()
      .execute(request.user.id, createPostDto);
    console.log('post entity user relation ->', post);
    return post;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.User)
  async getPost(id: number) {
    const post = this.getUserPost.getInstance().execute(id);
    return post;
  }

  @Get('getAll')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.SupportDesk)
  async getAllPost() {
    const post = this.getAllPosts.getInstance().execute();
    return post;
  }
}
