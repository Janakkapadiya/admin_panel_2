import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  email: string;

  @IsAlphanumeric()
  password: string;
}

export default LoginDto;
