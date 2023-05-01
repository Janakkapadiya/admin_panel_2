import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';

@Module({
  providers: [MailerService, EnvironmentConfigService],
  exports: [MailerService],
})
export class MailerModule {}
