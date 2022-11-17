import { Test, TestingModule } from '@nestjs/testing';
import { SolvedService } from './solved.service';

describe('SolvedService', () => {
  let service: SolvedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolvedService],
    }).compile();

    service = module.get<SolvedService>(SolvedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
