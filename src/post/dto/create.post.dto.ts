import { IsString } from 'class-validator';

export class CreatepostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
