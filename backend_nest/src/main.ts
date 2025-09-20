import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

      // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // your frontend
    credentials: true, // if you need cookies/auth headers
  });

   app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 👈 converts query strings to numbers using @Type
      whitelist: true,
    }),
  );
  const port = process.env.NEST_PORT ?? 3001;
  await app.listen(port, '0.0.0.0'); 
  console.log(`🚀 Nest running on port ${port}`);
}
bootstrap();
