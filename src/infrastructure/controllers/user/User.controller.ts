import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { getUserByIdUseCases } from 'src/usecases/user/getById.user.usecase';
import { getUsersUseCases } from 'src/usecases/user/all.user.usecase';
import { Role } from 'src/domain/enums/Roles.enum';
import { CreateUserDto } from './user-dto-class';
import { Roles } from 'src/infrastructure/common/decoretors/Roles.decoretor';
import { RolesGuard } from 'src/infrastructure/common/guards/roles.guard';
import { UserM } from 'src/domain/model/UserM';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { registerUseCases } from 'src/usecases/auth/register.usecase';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_USER_USECASES_PROXY)
    private readonly createUserUsecaseProxy: UseCaseProxy<registerUseCases>,
    @Inject(UsecasesProxyModule.GET_USER_BY_ID_USECASES_PROXY)
    private readonly getUserByIdUseCaseProxy: UseCaseProxy<getUserByIdUseCases>,
    @Inject(UsecasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly getUsersUseCaseProxy: UseCaseProxy<getUsersUseCases>,
  ) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    const { name, email, password, role } = userData;

    const insert_user = new UserM();
    insert_user.name = name;
    insert_user.email = email;
    insert_user.password = password;
    insert_user.role = role;

    const user = this.createUserUsecaseProxy.getInstance().execute(insert_user);

    return user;
  }

  @Roles(Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllUser() {
    return this.getUsersUseCaseProxy.getInstance().execute();
  }

  @Roles(Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.getUserByIdUseCaseProxy.getInstance().execute(id);
  }
}
