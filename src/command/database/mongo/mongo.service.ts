import { Command, CommandRunner, Option } from 'nest-commander';
import { user } from './collections/user.collection';
import { Injectable } from '@nestjs/common';
import { MongoProvider } from './mongo.provider';
import { User } from 'user/entities/user.entity';
import * as pluralize from 'pluralize';
import { Grant } from 'grant/entities/grant.entity';
import { grant } from './collections/grant.collection';

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

      const update = async (entity: any, data: any[], dropFirst: boolean) => {
        const collectionName = pluralize(entity.name.toLowerCase());
        if (cond(collectionName)) {
          if (dropFirst) await db.dropCollection(collectionName);

          const collection = db.collection<User>(collectionName);
          await collection.insertMany(data);

          console.log(
            '\x1b[32m%s\x1b[0m',
            `Inserted ${data.length} documents into the ${collectionName} collection`,
          );
        }
      };

      // Update collections
      await update(User, user, false);
      await update(Grant, grant, true);
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
