import { Grant, GrantSchema } from './entities/grant.entity';
import { GrantController } from './grant.controller';
import { GrantGateway } from './grant.gateway';
import { GrantRepository } from './grant.repository';
import { GrantResolver } from './grant.resolver';
import { GrantService } from './grant.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grant.name, schema: GrantSchema }]),
  ],
  controllers: [GrantController],
  providers: [GrantRepository, GrantService, GrantResolver, GrantGateway],
  exports: [GrantService],
})
export class GrantModule {}
