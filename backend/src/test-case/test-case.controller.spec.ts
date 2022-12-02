import { Test, TestingModule } from '@nestjs/testing';
import { TestCaseController } from './test-case.controller';
import { TestCaseService } from './test-case.service';
import { TestCaseRepository } from './test-case.repository';
import { ProblemRepository } from '../problem/problem.repository';

describe('TestCaseController', () => {
  let testCaseController: TestCaseController;
  let testCaseService: TestCaseService;
  // let testCaseRepository: TestCaseRepository;
  // let problemRepository: ProblemRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestCaseController],
      providers: [TestCaseService, TestCaseRepository, ProblemRepository],
    }).compile();

    testCaseController = module.get<TestCaseController>(TestCaseController);
    testCaseService = module.get<TestCaseService>(TestCaseService);
    // testCaseRepository = module.get<TestCaseRepository>(TestCaseRepository);
    // problemRepository = module.get<ProblemRepository>(ProblemRepository);
  });

  it('should be defined', () => {
    expect(testCaseService).toBeDefined();
    expect(testCaseController).toBeDefined();
  });
});
