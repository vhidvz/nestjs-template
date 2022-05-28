import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  // or, if you only want to print Nest's warnings and errors
  await CommandFactory.run(AppModule, ['log', 'warn', 'error', 'debug']);
}

bootstrap();
