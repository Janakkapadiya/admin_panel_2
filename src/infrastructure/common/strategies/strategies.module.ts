import { Module } from '@nestjs/common';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';

@Module({
  providers: [LoginUseCases],
})
export class StrategiesModule {}
