import { GrantRepository } from './grant.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('GrantRepository', () => {
  let Repository: GrantRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrantRepository],
    }).compile();

    Repository = module.get<GrantRepository>(GrantRepository);
  });

  it('should be defined', () => {
    expect(Repository).toBeDefined();
  });
});
