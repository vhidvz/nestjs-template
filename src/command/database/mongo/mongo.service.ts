import { Grant, GrantDocument } from 'grant/entities/grant.entity';
import { Command, CommandRunner, Option } from 'nest-commander';
import { User, UserDocument } from 'user/entities/user.entity';
import { grant } from './collections/grant.collection';
import { user } from './collections/user.collection';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

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
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Grant.name) private readonly grantModel: Model<GrantDocument>,
  ) {}

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
      const update = async (model: Model<any>, data: any[]) => {
        if (cond(model.collection.name)) {
          await model.insertMany(data);

          console.log(
            '\x1b[32m%s\x1b[0m',
            `Inserted ${data.length} documents into the ${model.collection.name} collection`,
          );
        }
      };

      await update(this.userModel, user);
      await update(this.grantModel, grant);
    } catch (error) {
      console.log(error);
    } finally {
      // this.mongoProvider.close();
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
