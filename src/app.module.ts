import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import GraphQLJSON from 'graphql-type-json';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLFilter } from 'common/scalars/filter.scalar';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
