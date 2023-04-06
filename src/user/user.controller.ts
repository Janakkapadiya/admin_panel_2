import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Post as PostSchema, User } from '@prisma/client';
import { Role } from 'src/common/enum/role.enum';
import { CookieAuthenticationGuard } from 'src/guard/cookieAuthenticationGuard';
import { RolesGuard } from 'src/guard/roleGuard';
import { UserService } from './user.service';
import { Roles } from './decorator/role.decorator';
import { CreateUserByAdminDto, SetPowerUserPwdDto } from './dtos/create.user';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Roles(Role.Admin)
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Post('createuser')
  async createPowerUser(
    @Body() userPaylaod: CreateUserByAdminDto,
  ): Promise<User> {
    return this.usersService.createUserByAdmin(userPaylaod);
  }

  @Roles(Role.Admin, Role.PowerUser)
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Post('user')
  async createUser(@Body() userData: any): Promise<User> {
    return this.usersService.createUser(userData);
  }

  @Roles(Role.PowerUser)
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Get('all')
  async getAllUser(): Promise<User[]> {
    return this.usersService.getAll({ role: Role.User });
  }

  @Roles(Role.PowerUser)
  @UseGuards(CookieAuthenticationGuard, RolesGuard)
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return this.usersService.getById(id);
  }

  @Post('poweruser/setpassword/:id')
  async checkPowerUser(
    @Param('id') id: string,
    @Body() body: SetPowerUserPwdDto,
  ): Promise<User> {
    return this.usersService.setPowerUserPassword(id, body.password);
  }
}
