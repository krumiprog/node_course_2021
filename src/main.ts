import * as path from 'path';
import * as yaml from 'yamljs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { CONFIG } from './common/config';
import { INestApplication } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const { PORT, USE_FASTIFY } = CONFIG;

  let app: INestApplication;

  if (USE_FASTIFY === 'true') {
    app = await NestFactory.create<NestFastifyApplication>(AppModule);
  } else {
    app = await NestFactory.create<NestExpressApplication>(AppModule);
  }

  const swaggerDocument = yaml.load(
    path.join(__dirname, '..', 'doc', 'api.yaml'),
  );
  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`),
  );
}
bootstrap();
