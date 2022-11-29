import { Test, TestingModule } from '@nestjs/testing';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
import { ProblemRepository } from './problem.repository';

describe('ProblemController', () => {
  let problemController: ProblemController;
  let problemService: ProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemController],
      providers: [ProblemService, ProblemRepository],
    }).compile();

    problemController = module.get<ProblemController>(ProblemController);
    problemService = module.get<ProblemService>(ProblemService);
  });

  it('should be defined', () => {
    expect(problemService).toBeDefined();
    expect(problemController).toBeDefined();
  });
});
