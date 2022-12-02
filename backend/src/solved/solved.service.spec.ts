import { Test, TestingModule } from '@nestjs/testing';
import { SolvedService } from './solved.service';
import { SolvedRepository } from './solved.repository';
import { UserRepository } from '../users/user.repository';
import { ProblemRepository } from '../problem/problem.repository';
import { TestCaseRepository } from '../test-case/test-case.repository';

describe('SolvedService', () => {
  let solvedService: SolvedService;
  let solvedRepository: SolvedRepository;
  let userRepository: UserRepository;
  let problemRepository: ProblemRepository;
  let testCaseRepository: TestCaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SolvedService,
        SolvedRepository,
        UserRepository,
        ProblemRepository,
        TestCaseRepository,
      ],
    }).compile();

    solvedService = module.get<SolvedService>(SolvedService);
    solvedRepository = module.get<SolvedRepository>(SolvedRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    problemRepository = module.get<ProblemRepository>(ProblemRepository);
    testCaseRepository = module.get<TestCaseRepository>(TestCaseRepository);
  });

  it('should be defined', () => {
    expect(testCaseRepository).toBeDefined();
    expect(problemRepository).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(solvedRepository).toBeDefined();
    expect(solvedService).toBeDefined();
  });
});
