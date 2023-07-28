import { Test, TestingModule } from '@nestjs/testing';
import { AccessesController } from './accesses.controller';

describe('AccessesController', () => {
  let controller: AccessesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessesController],
    }).compile();

    controller = module.get<AccessesController>(AccessesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
