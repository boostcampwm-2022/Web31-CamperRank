import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDocumentBuilder = new DocumentBuilder()
    .setTitle('CamperRank APIs')
    .setDescription('CamperRank API 관련 문서입니다.')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
  );
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(3000);
}

bootstrap();
