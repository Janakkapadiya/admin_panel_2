import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Post as Posts } from '@prisma/client';
import LoginDto from 'src/auth/dto/login.dto';
import { Role } from 'src/common/enum/role.enum';
import { CookieAuthenticationGuard } from 'src/guard/cookieAuthenticationGuard';
import { LogInWithCredentialsGuard } from 'src/guard/loginWithCredentialsGuard';
import { RolesGuard } from 'src/guard/roleGuard';
import { PostService } from 'src/post/post.service';
import { Roles } from 'src/user/decorator/role.decorator';

@ApiTags('support-desk')
@Controller('support-desk')
export class SupportDeskController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(LogInWithCredentialsGuard)
  @Post('log-in')
  async logIn(@Req() request) {
    return request.user;
  }

  @Roles(Role.SupportDesk)
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Get('posts')
  async getTransactions(@Req() req): Promise<Posts[]> {
    console.log(req.user, 'REQ');
    return await this.postService.getAllPosts();
  }
}
