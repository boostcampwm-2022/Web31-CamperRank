import { Test, TestingModule } from '@nestjs/testing';
import { SolvedController } from './solved.controller';
import { SolvedService } from './solved.service';

describe('SolvedController', () => {
  let controller: SolvedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolvedController],
      providers: [SolvedService],
    }).compile();

    controller = module.get<SolvedController>(SolvedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
