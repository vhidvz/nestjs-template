import { MongoProvider } from './mongo.provider';
import { MongoService } from './mongo.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MongoService, MongoProvider],
  exports: [MongoService],
})
export class MongoModule {}
