import { Test, TestingModule } from '@nestjs/testing';
import { TestCaseController } from './test-case.controller';
import { TestCaseService } from './test-case.service';

describe('TestCaseController', () => {
  let controller: TestCaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestCaseController],
      providers: [TestCaseService],
    }).compile();

    controller = module.get<TestCaseController>(TestCaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
