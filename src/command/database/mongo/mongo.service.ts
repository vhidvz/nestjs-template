import { Command, CommandRunner, Option } from 'nest-commander';
import { user } from './collections/user.collection';
import { Injectable } from '@nestjs/common';
import { UserService } from 'user/user.service';

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
  constructor(private readonly userService: UserService) {}

  public async run(
    passedParams: string[],
    options?: MongoCommandOptions,
  ): Promise<void> {
    if (passedParams.includes('seed')) this.seed(options);
  }

  public async seed(options?: MongoCommandOptions): Promise<void> {
    console.log('Seeding mongo...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const cond = (collection) =>
      (typeof options?.collection === 'boolean' && options?.collection) ||
      (typeof options?.collection === 'object' &&
        options?.collection.includes(collection));

    if (cond('mongo'))
      user.forEach(async (item) => await this.userService.create(item));

    console.log('Mongo seeded!');
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
