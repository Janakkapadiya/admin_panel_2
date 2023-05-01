import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Role } from 'src/domain/enums/Roles.enum';

export class CreateUserDto {
  id: number;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsEnum([Role.PowerUser, Role.User, Role.SupportDesk])
  role: Role;
}

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
}
