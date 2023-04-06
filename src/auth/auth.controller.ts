import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CookieAuthenticationGuard } from 'src/guard/cookieAuthenticationGuard';
import { LogInWithCredentialsGuard } from 'src/guard/loginWithCredentialsGuard';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import { RequestWithUser } from './requestWithUser.interface';

@Controller('auth')
// @UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authenticationService: AuthService) {}
  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LogInWithCredentialsGuard)
  @Post('log-in')
  async logIn(@Req() request, @Body() body: LoginDto) {
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Get()
  async authenticate(@Req() request) {
    return request.user;
  }
}
