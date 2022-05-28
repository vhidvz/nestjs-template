import { Injectable } from '@nestjs/common';
import { MONGO_CONFIG } from 'common/configs';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoProvider extends MongoClient {
  constructor() {
    super(MONGO_CONFIG());
  }
}
