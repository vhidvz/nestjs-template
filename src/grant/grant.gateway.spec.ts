import { GrantGateway } from './grant.gateway';
import { GrantService } from './grant.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GrantGateway', () => {
  let gateway: GrantGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrantGateway, GrantService],
    }).compile();

    gateway = module.get<GrantGateway>(GrantGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
