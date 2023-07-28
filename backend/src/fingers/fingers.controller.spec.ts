import { Test, TestingModule } from '@nestjs/testing';
import { FingersController } from './fingers.controller';

describe('FingerController', () => {
  let controller: FingersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FingersController],
    }).compile();

    controller = module.get<FingersController>(FingersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
