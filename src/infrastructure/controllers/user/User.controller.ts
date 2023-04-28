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
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { RoleGuard } from 'src/infrastructure/common/guards/roles.guard';
import { Role } from 'src/domain/enums/Roles.enum';
import { Roles } from 'src/infrastructure/common/decoretors/Roles.decoretor';
import { UserPresenter } from './user.presenter';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from 'src/usecases/user/create.user.usecase';
import { ApiResponseType } from 'src/infrastructure/common/swagger/res.decorator';
import { UserM } from 'src/domain/model/UserM';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_USER_USECASES_PROXY)
    private readonly createUserUsecaseProxy: UseCaseProxy<CreateUserUseCase>,
    @Inject(UsecasesProxyModule.GET_USER_BY_ID_USECASES_PROXY)
    private readonly getUserByIdUseCaseProxy: UseCaseProxy<getUserByIdUseCases>,
    @Inject(UsecasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly getUsersUseCaseProxy: UseCaseProxy<getUsersUseCases>,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  async createUser(@Body() userData: CreateUserDto) {
    const user = await this.createUserUsecaseProxy
      .getInstance()
      .execute(userData);
    console.log('the controller user -> ', user);
    return new UserPresenter(user);
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('all')
  @ApiResponseType(UserPresenter, true)
  async getAllUser() {
    return this.getUsersUseCaseProxy.getInstance().execute();
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  @ApiResponseType(UserPresenter, true)
  async getUser(@Param('id') id: number) {
    return this.getUserByIdUseCaseProxy.getInstance().execute(id);
  }
}
