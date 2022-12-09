import { Test, TestingModule } from '@nestjs/testing';
import { TestCaseController } from './test-case.controller';
import { TestCaseService } from './test-case.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestCase } from './entities/test-case.entity';
import { MockTestCaseRepository } from '../mock/test-case.mock';
import { MockProblemRepository } from '../mock/problem.mock';
import { Problem } from '../problem/entities/problem.entity';

describe('TestCaseController', () => {
  let testCaseController: TestCaseController;
  let testCaseService: TestCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestCaseController],
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

    testCaseController = module.get<TestCaseController>(TestCaseController);
    testCaseService = module.get<TestCaseService>(TestCaseService);
  });

  it('should be defined', () => {
    expect(testCaseService).toBeDefined();
    expect(testCaseController).toBeDefined();
  });
});
