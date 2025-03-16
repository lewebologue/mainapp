import { Test, TestingModule } from '@nestjs/testing';
import { CakeService } from './cake.service';

describe('CakeService', () => {
  let service: CakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CakeService],
    }).compile();

    service = module.get<CakeService>(CakeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
