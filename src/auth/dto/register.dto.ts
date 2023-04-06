import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsAlphanumeric()
  password: string;
}

export default RegisterDto;
