import { Test, TestingModule } from '@nestjs/testing';
import { ProblemController } from './problem.controller';
import { ProblemService } from './problem.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Problem } from './entities/problem.entity';
import { MockProblemRepository } from '../mock/problem.mock';
import { Solved } from '../solved/entities/solved.entity';
import { User } from '../users/entities/user.entity';

describe('ProblemController', () => {
  let problemController: ProblemController;
  let problemService: ProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemController],
      providers: [
        ProblemService,
        {
          provide: getRepositoryToken(Problem),
          useValue: MockProblemRepository(),
        },
        {
          provide: getRepositoryToken(Solved),
          useValue: MockProblemRepository(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: MockProblemRepository(),
        },
      ],
    }).compile();

    problemController = module.get<ProblemController>(ProblemController);
    problemService = module.get<ProblemService>(ProblemService);
  });

  it('should be defined', () => {
    expect(problemService).toBeDefined();
    expect(problemController).toBeDefined();
  });
});
