import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Role } from 'src/domain/enums/Roles.enum';

export class CreateUserDto {
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
  @IsEnum([Role.PowerUser, Role.User, Role.SupportDesk, Role.Admin])
  role: Role;
}

export default CreateUserDto;
