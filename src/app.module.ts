import { DatabaseCommand, MongoDatabaseCommand } from 'command/database';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { grant } from 'command/database/mongo/collections/seeds';
import { GraphQLFilter } from './common/scalars/filter.scalar';
import { AuthorityModule } from './authority/authority.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GrantModule } from 'grant/grant.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { MONGO_CONFIG } from './common/configs';
// import GraphQLJSON from 'graphql-type-json';
import { ConfigModule } from '@nestjs/config';
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
    MongoDatabaseCommand,
  ],
})
export class AppModule {}
