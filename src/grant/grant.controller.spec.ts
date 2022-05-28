import { GrantController } from './grant.controller';
import { GrantService } from './grant.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('GrantController', () => {
  let controller: GrantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrantController],
      providers: [GrantService],
    }).compile();

    controller = module.get<GrantController>(GrantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
