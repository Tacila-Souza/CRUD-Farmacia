import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CRUD FARMACIA')
    .setDescription('Projeto crud farmacia')
    .setContact(
      'Tacila Souza',
      'https://github.com/Tacila-Souza',
      'tacila@gmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';

  // Configuração avançada do ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove automaticamente campos do JSON que não estão no seu objeto/entidade
      forbidNonWhitelisted: true, // Retorna erro 400 se o usuário enviar campos extras não permitidos
      transform: true, // Transforma os tipos dos payloads para os tipos das classes (ex: string para number)
    }),
  );

  // Habilita o acesso de diferentes origens (importante para o Front-end)
  app.enableCors();

  // Porta de execução
  await app.listen(process.env.PORT ?? 4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
