import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const uploadDir = join(__dirname, '..', 'uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }

  app.useStaticAssets(uploadDir, {
    prefix: '/uploads',
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads')); //next.js에서 이미지파일 접근가능
  app.enableCors();//next.js에서 api 접근가능

  app.use(session({
    secret: 'mySecret', // 세션 암호화 키
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }, // 1시간
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
