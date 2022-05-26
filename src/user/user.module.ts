import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserMicroservice } from './user.microservice';
import { UserGateway } from './user.gateway';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController, UserMicroservice],
  providers: [UserRepository, UserService, UserResolver, UserGateway],
  exports: [UserService],
})
export class UserModule {}
