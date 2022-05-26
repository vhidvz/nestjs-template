import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLFilter } from 'common/scalars/filter.scalar';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MONGO_CONFIG } from 'common/configs';
import GraphQLJSON from 'graphql-type-json';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import 'reflect-metadata';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGO_CONFIG()),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      resolvers: { JSON: GraphQLJSON, Filter: GraphQLFilter },
      transformAutoSchemaFile: true,
      driver: ApolloDriver,
      playground: true,
      debug: true,
      cors: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
