import { Test, TestingModule } from '@nestjs/testing';
import { ProblemService } from './problem.service';
import { MockRepository } from '../mock/common.mock';
import { Problem } from './entities/problem.entity';
import { User } from '../users/entities/user.entity';
import { Solved } from '../solved/entities/solved.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockProblemRepository } from '../mock/problem.mock';
import { MockSolvedRepository } from '../mock/solved.mock';
import { MockUserRepository } from '../mock/user.mock';

describe('ProblemService', () => {
  let problemService: ProblemService;
  let problemRepository: MockRepository<Problem>;
  let solvedRepository: MockRepository<Solved>;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemService,
        {
          provide: getRepositoryToken(Problem),
          useValue: MockProblemRepository(),
        },
        {
          provide: getRepositoryToken(Solved),
          useValue: MockSolvedRepository(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: MockUserRepository(),
        },
      ],
    }).compile();

    problemService = module.get<ProblemService>(ProblemService);
    problemRepository = module.get<MockRepository<Problem>>(
      getRepositoryToken(Problem),
    );
    solvedRepository = module.get<MockRepository<Solved>>(
      getRepositoryToken(Solved),
    );
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
    expect(solvedRepository).toBeDefined();
    expect(problemRepository).toBeDefined();
    expect(problemService).toBeDefined();
  });
});
