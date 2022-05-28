import { Test, TestingModule } from '@nestjs/testing';
import { MongoProvider } from './mongo.provider';

describe('MongoProvider', () => {
  let provider: MongoProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoProvider],
    }).compile();

    provider = module.get<MongoProvider>(MongoProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
