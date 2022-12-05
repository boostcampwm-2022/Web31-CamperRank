import { Test, TestingModule } from '@nestjs/testing';
import { TestCaseService } from './test-case.service';
import { MockRepository } from '../mock/common.mock';
import { TestCase } from './entities/test-case.entity';
import { Problem } from '../problem/entities/problem.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockTestCaseRepository } from '../mock/test-case.mock';
import { MockProblemRepository } from '../mock/problem.mock';

describe('TestCaseService', () => {
  let testCaseService: TestCaseService;
  let testCaseRepository: MockRepository<TestCase>;
  let problemRepository: MockRepository<Problem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestCaseService,
        {
          provide: getRepositoryToken(TestCase),
          useValue: MockTestCaseRepository(),
        },
        {
          provide: getRepositoryToken(Problem),
          useValue: MockProblemRepository(),
        },
      ],
    }).compile();

    testCaseService = module.get<TestCaseService>(TestCaseService);
    testCaseRepository = module.get<MockRepository<TestCase>>(
      getRepositoryToken(TestCase),
    );
    problemRepository = module.get<MockRepository<Problem>>(
      getRepositoryToken(Problem),
    );
  });

  it('should be defined', () => {
    expect(problemRepository).toBeDefined();
    expect(testCaseRepository).toBeDefined();
    expect(testCaseService).toBeDefined();
  });
});
