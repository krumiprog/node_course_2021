import * as path from 'path';
import * as yaml from 'yamljs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { CONFIG } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocument = yaml.load(
    path.join(__dirname, '..', 'doc', 'api.yaml'),
  );
  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(CONFIG.PORT);
}
bootstrap();
