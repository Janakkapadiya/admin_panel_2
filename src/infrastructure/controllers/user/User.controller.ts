import { CookieAuthenticationGuard } from 'src/guard/cookieAuthenticationGuard';
import { registerUseCases } from 'src/usecases/auth/register.usecase';
import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { getUserByIdUseCases } from 'src/usecases/user/getById.user.usecase';
import { getUsersUseCases } from 'src/usecases/user/all.user.usecase';
import { Role } from 'src/domain/enums/Roles.enum';
import CreateUserDto, { CreateUserByAdminDto } from './user-dto-class';
import { User } from 'src/infrastructure/entities/user.entity';
import { Roles } from 'src/infrastructure/common/decoretors/Roles.decoretor';
import { RolesGuard } from 'src/infrastructure/common/guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.SIGNUP_USECASE_PROXY)
    private readonly getTodoUsecaseProxy: UseCaseProxy<registerUseCases>,
    @Inject(UsecasesProxyModule.GET_USER_BY_ID_USECASES_PROXY)
    private readonly getAllTodoUsecaseProxy: UseCaseProxy<getUserByIdUseCases>,
    @Inject(UsecasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly updateTodoUsecaseProxy: UseCaseProxy<getUsersUseCases>,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post('createuser')
  async createPowerUser(
    @Body() userPaylaod: CreateUserByAdminDto,
  ): Promise<User> {
    return this.usersService.createUserByAdmin(userPaylaod);
  }

  @Roles(Role.Admin, Role.PowerUser)
  @UseGuards(RolesGuard)
  @Post('user')
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    const user = this.getTodoUsecaseProxy.getInstance().execute(userData);
    return user;
  }

  @Roles(Role.PowerUser)
  @UseGuards(RolesGuard)
  @Get('all')
  async getAllUser(): Promise<User[]> {
    return this.usersService.getAll({ role: Role.User });
  }

  @Roles(Role.PowerUser)
  @UseGuards(RolesGuard)
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