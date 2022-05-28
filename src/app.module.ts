import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLFilter } from './common/scalars/filter.scalar';
import { DatabaseCommand } from 'command/database';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { MONGO_CONFIG } from './common/configs';
import { ConfigModule } from '@nestjs/config';
// import GraphQLJSON from 'graphql-type-json';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { join } from 'path';
import 'reflect-metadata';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGO_CONFIG()),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      resolvers: {
        // JSON: GraphQLJSON,
        Filter: GraphQLFilter,
      },
      transformAutoSchemaFile: true,
      driver: ApolloDriver,
      playground: true,
      debug: true,
      cors: true,
    }),
    AuthModule,
    UserModule,
    // command
    DatabaseCommand,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
