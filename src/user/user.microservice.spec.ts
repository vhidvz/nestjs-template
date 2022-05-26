import { Test, TestingModule } from '@nestjs/testing';
import { UserMicroservice as UserMicroservice } from './user.microservice';
import { UserService } from '../user/user.service';

describe('UserMicroservice', () => {
  let controller: UserMicroservice;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMicroservice],
      providers: [UserService],
    }).compile();

    controller = module.get<UserMicroservice>(UserMicroservice);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
