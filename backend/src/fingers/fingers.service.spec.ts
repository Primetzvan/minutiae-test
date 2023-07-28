import { Test, TestingModule } from '@nestjs/testing';
import { FingersService } from './fingers.service';

describe('FingersService', () => {
  let service: FingersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FingersService],
    }).compile();

    service = module.get<FingersService>(FingersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
