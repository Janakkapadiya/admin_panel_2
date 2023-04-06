import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role } from 'src/common/enum/role.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { decrypt, encrypt } from 'src/utils/crypto.util';
import { sendEmail } from 'src/utils/mailer';
import * as bcrypt from 'bcrypt';
import CreateUserDto, {
  CreateUserByAdminDto,
  SetPowerUserPwdDto,
} from './dtos/create.user';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async getByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getAll(filter: any) {
    const users = await this.prismaService.user.findMany({
      where: {
        ...filter,
      },
    });
    if (users) {
      return users;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async createUser(userData: CreateUserDto) {
    const newUser = await this.prismaService.user.create({
      data: { ...userData, role: Role.User },
    });
    return newUser;
  }

  async createUserByAdmin(userData: CreateUserByAdminDto) {
    const newUser = await this.prismaService.user.create({ data: userData });
    //TODO: encrypt user id and send in link via email
    const encryptedUserId = encrypt(newUser.id + '');
    sendEmail(newUser.email, `Change Your Password`, `${encryptedUserId}`);

    return newUser;
  }

  async setPowerUserPassword(id: string, password: string) {
    const userId = decrypt(id);
    const user = await this.prismaService.user.findFirst({
      where: {
        id: parseInt(userId),
        passowordPrompted: false,
      },
    });
    if (!user) {
      throw new HttpException(`Link Has Expired`, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        passowordPrompted: true,
        password: hashedPassword,
      },
    });

    return user;
  }
}
