import { Test, TestingModule } from '@nestjs/testing';
import { TestCaseService } from './test-case.service';
import { TestCaseRepository } from './test-case.repository';
import { ProblemRepository } from '../problem/problem.repository';

describe('TestCaseService', () => {
  let testCaseService: TestCaseService;
  let testCaseRepository: TestCaseRepository;
  let problemRepository: ProblemRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestCaseService, TestCaseRepository, ProblemRepository],
    }).compile();

    testCaseService = module.get<TestCaseService>(TestCaseService);
    testCaseRepository = module.get<TestCaseRepository>(TestCaseRepository);
    problemRepository = module.get<ProblemRepository>(ProblemRepository);
  });

  it('should be defined', () => {
    expect(problemRepository).toBeDefined();
    expect(testCaseRepository).toBeDefined();
    expect(testCaseService).toBeDefined();
  });
});
