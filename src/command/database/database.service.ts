import { Injectable } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import { MongoService } from './mongo/mongo.service';

interface DatabaseCommandOptions {
  database?: { mongo?: boolean } | true;
}

@Injectable()
@Command({
  name: 'db',
  arguments: '<task>',
  description: 'db commands',
  subCommands: [MongoService],
})
export class DatabaseService implements CommandRunner {
  constructor(private readonly mongoService: MongoService) {}

  public async run(
    passedParams: string[],
    options?: DatabaseCommandOptions,
  ): Promise<void> {
    if (passedParams.includes('seed')) this.seed(options);
  }

  public async seed(options?: DatabaseCommandOptions): Promise<void> {
    console.log('Seeding database...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const cond = (db) =>
      (typeof options?.database === 'boolean' && options?.database) ||
      (typeof options?.database === 'object' && options?.database[db]);

    if (cond('mongo')) await this.mongoService.seed({ collection: true });

    console.log('Database seeded!');
  }

  @Option({
    required: false,
    defaultValue: true,
    flags: '-db, --database [string]',
    description: 'Seed database',
  })
  parseDatabase(val: string): DatabaseCommandOptions['database'] {
    return { mongo: val.split(',').includes('mongo') };
  }
}
