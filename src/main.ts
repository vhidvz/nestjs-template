import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle(process.env.npm_package_name)
    .setDescription(process.env.npm_package_description)
    .setVersion(process.env.npm_package_version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { docExpansion: 'none' },
  });

  await app.listen(process.env.PORT ?? 3000);

  const url = await app.getUrl();
  console.log(`Application is running on: ${url}`);
  console.log(`Swagger UI is running on: ${url}/api`);
  console.log(`GraphQL IDE is running on: ${url}/graphql`);
  console.log(`OpenApi Spec is running on: ${url}/api-json`);
}
bootstrap();
