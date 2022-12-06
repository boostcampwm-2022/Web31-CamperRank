import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(process.env.HTTPS_PRIVATE_KEY),
    cert: fs.readFileSync(process.env.HTTPS_PUBLIC_CERTIFICATE),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions, cors: true });

  app.setGlobalPrefix('api');
  const swaggerDocumentBuilder = new DocumentBuilder()
    .setTitle('CamperRank APIs')
    .setDescription('CamperRank API 관련 문서입니다.')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
  );
  SwaggerModule.setup('swagger', app, swaggerDocument);

  await app.listen(3000);
}

bootstrap();
