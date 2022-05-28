import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { UserModule } from 'user/user.module';

@Module({
  imports: [UserModule],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
