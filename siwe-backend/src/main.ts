import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { globalConstants } from './global_constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { origin: globalConstants.frontendUrl, credentials: true },
  });
  await app.listen(3001);
}
bootstrap();
