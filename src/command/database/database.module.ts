import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [MongoModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
