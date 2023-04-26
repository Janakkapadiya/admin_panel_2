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
import { CreateUserDto } from './user-dto-class';
import { UserM } from 'src/domain/model/UserM';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { registerUseCases } from 'src/usecases/auth/register.usecase';
import { roleGuard } from 'src/infrastructure/common/guards/roles.guard';
import { Role } from 'src/domain/enums/Roles.enum';
import { role } from 'src/infrastructure/common/decoretors/Roles.decoretor';
import { use } from 'passport';
import { UserPresenter } from './user.presenter';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
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

    console.log(this.createUserUsecaseProxy.getInstance());

    const insert_user = new UserM();
    insert_user.email = email;
    insert_user.name = name;
    insert_user.role = role;
    insert_user.password = password;

    const user = await this.createUserUsecaseProxy
      .getInstance()
      .execute(insert_user);

    console.log(user);

    return user;
  }

  @role(Role.User)
  @UseGuards(roleGuard)
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllUser() {
    return this.getUsersUseCaseProxy.getInstance().execute();
  }

  @role(Role.User)
  @UseGuards(roleGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.getUserByIdUseCaseProxy.getInstance().execute(id);
  }
}
