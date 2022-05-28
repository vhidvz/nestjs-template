import { Command, CommandRunner, Option } from 'nest-commander';
import { user } from './collections/user.collection';
import { Injectable } from '@nestjs/common';
import { MongoProvider } from './mongo.provider';
import { User } from 'user/entities/user.entity';
import * as pluralize from 'pluralize';

interface MongoCommandOptions {
  collection?: string[] | true;
}

@Injectable()
@Command({
  name: 'mongo',
  arguments: '<task>',
  options: { isDefault: true },
  description: 'MongoDB commands',
})
export class MongoService implements CommandRunner {
  constructor(private readonly mongoProvider: MongoProvider) {}

  public async run(
    passedParams: string[],
    options?: MongoCommandOptions,
  ): Promise<void> {
    if (passedParams.includes('seed')) this.seed(options);
  }

  public async seed(options?: MongoCommandOptions): Promise<void> {
    console.log('Seeding mongo...');

    const cond = (collection) =>
      (typeof options?.collection === 'boolean' && options?.collection) ||
      (typeof options?.collection === 'object' &&
        options?.collection.includes(collection));

    try {
      await this.mongoProvider.connect();
      console.log('Connected successfully to server');

      const db = this.mongoProvider.db(process.env.MONGO_DB);

      // users collection
      const usersCollectionName = pluralize(User.name.toLowerCase());
      if (cond(usersCollectionName)) {
        const collection = db.collection<User>(usersCollectionName);
        await collection.insertMany(user);

        console.log(
          '\x1b[32m%s\x1b[0m',
          `Inserted ${user.length} documents into the ${usersCollectionName} collection`,
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.mongoProvider.close();
      console.log('Mongo seeded!');
    }
  }

  @Option({
    required: false,
    defaultValue: true,
    flags: '-c, --collection [string]',
    description: 'Collections to seed',
  })
  parseString(val: string): string[] {
    return val.split(',');
  }
}
