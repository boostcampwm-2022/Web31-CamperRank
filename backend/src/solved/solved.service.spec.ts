import { Test, TestingModule } from '@nestjs/testing';
import { SolvedService } from './solved.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Solved } from './entities/solved.entity';
import { MockSolvedRepository } from '../mock/solved.mock';
import { User } from '../users/entities/user.entity';
import { Problem } from '../problem/entities/problem.entity';
import { TestCase } from '../test-case/entities/test-case.entity';
import { MockUserRepository } from '../mock/user.mock';
import { MockProblemRepository } from '../mock/problem.mock';
import { MockTestCaseRepository } from '../mock/test-case.mock';
import { MockRepository } from '../mock/common.mock';

describe('SolvedService', () => {
  let solvedService: SolvedService;
  let solvedRepository: MockRepository<Solved>;
  let userRepository: MockRepository<User>;
  let problemRepository: MockRepository<Problem>;
  let testCaseRepository: MockRepository<TestCase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SolvedService,
        {
          provide: getRepositoryToken(Solved),
          useValue: MockSolvedRepository(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: MockUserRepository(),
        },
        {
          provide: getRepositoryToken(Problem),
          useValue: MockProblemRepository(),
        },
        {
          provide: getRepositoryToken(TestCase),
          useValue: MockTestCaseRepository(),
        },
      ],
    }).compile();

    solvedService = module.get<SolvedService>(SolvedService);
    solvedRepository = module.get<MockRepository<Solved>>(
      getRepositoryToken(Solved),
    );
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
    problemRepository = module.get<MockRepository<Problem>>(
      getRepositoryToken(Problem),
    );
    testCaseRepository = module.get<MockRepository<TestCase>>(
      getRepositoryToken(TestCase),
    );
  });

  it('should be defined', () => {
    expect(testCaseRepository).toBeDefined();
    expect(problemRepository).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(solvedRepository).toBeDefined();
    expect(solvedService).toBeDefined();
  });
});
