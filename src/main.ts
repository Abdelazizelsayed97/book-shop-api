import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';



async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestApplication>(AppModule);

  app.enableCors({
    origin: true, // السماح لجميع المصادر (يمكن تحديد مصادر محددة في الإنتاج)
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  const host = '0.0.0.0';


  await app.listen(port, host);


  console.log(`🚀 Server is running on: http://0.0.0.0:${port}`);
  console.log(`🌐 GraphQL Playground: http://0.0.0.0:${port}/graphql`);
  console.log(`📱 Network access: http://192.168.50.66:${port}`);
  console.log(`🔗 Local access: http://localhost:${port}`);
}
bootstrap();
