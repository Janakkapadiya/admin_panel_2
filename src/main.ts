import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { AllExceptionFilter } from './infrastructure/common/filter/exception';
import * as cookieParser from 'cookie-parser';
import { LoggerService } from './infrastructure/logger/logger.service';

async function bootstrap() {
  const env = process.env.NODE_ENV;

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));

  // base routing
  app.setGlobalPrefix('api_v1');

  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Clean Architecture Nestjs')
      .setDescription('Example with todo list')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(3000);
}
bootstrap();
