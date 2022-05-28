import { grant } from 'command/database/mongo/collections/grant.collection';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLFilter } from './common/scalars/filter.scalar';
import { AuthorityModule } from './authority/authority.module';
import { DatabaseCommand } from 'command/database';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { GrantModule } from 'grant/grant.module';
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
      sortSchema: true,
      playground: true,
      debug: true,
      cors: true,
    }),
    AuthModule,
    UserModule,
    GrantModule,
    AuthorityModule.register(grant),
    // command
    DatabaseCommand,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
