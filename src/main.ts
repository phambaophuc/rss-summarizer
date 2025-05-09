import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('app.port') || 3000;

  const config = new DocumentBuilder()
    .setTitle('RSS Summarizer API')
    .setDescription(
      'API cho hệ thống đọc RSS, tóm tắt nội dung và tạo newsletter tự động.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Nhập token để truy cập các endpoint được bảo vệ (nếu có)',
      },
      'access-token',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  await app.listen(appPort);
}
void bootstrap();
