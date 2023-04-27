import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/domain/enums/Roles.enum';

export class AuthLoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class RegisterDto {
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
  @IsEnum([Role.Admin])
  role: Role;
}

export default RegisterDto;
