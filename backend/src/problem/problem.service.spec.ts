import { Test, TestingModule } from '@nestjs/testing';
import { ProblemService } from './problem.service';
import { ProblemRepository } from './problem.repository';
import { SolvedRepository } from '../solved/solved.repository';
import { UserRepository } from '../users/user.repository';

describe('ProblemService', () => {
  let problemService: ProblemService;
  let problemRepository: ProblemRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemService,
        ProblemRepository,
        SolvedRepository,
        UserRepository,
      ],
    }).compile();

    problemService = module.get<ProblemService>(ProblemService);
    problemRepository = module.get<ProblemRepository>(ProblemRepository);
  });

  it('should be defined', () => {
    expect(problemRepository).toBeDefined();
    expect(problemService).toBeDefined();
  });
});
