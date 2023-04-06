import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Role } from 'src/common/enum/role.enum';

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
}

export class CreateUserByAdminDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsEnum([Role.PowerUser, Role.User, Role.SupportDesk])
  role: Role;
}

export class SetPowerUserPwdDto {
  @ApiProperty()
  @IsString()
  password: string;
}

export default CreateUserDto;
