import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let Repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    Repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(Repository).toBeDefined();
  });
});
