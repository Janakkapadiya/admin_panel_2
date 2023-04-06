import { Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { SupportDeskController } from './support-desk.controller';

@Module({
  controllers: [SupportDeskController],
  imports: [PostModule],
})
export class SupportDeskModule {}
