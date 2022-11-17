import { Problem } from '../../problem/entities/problem.entity';
import { TestCase } from '../entities/test-case.entity';

export class SimpleTestCaseDto {
  problem: Problem;
  caseNumber: number;
  testInput: string;
  testOutput: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(testCase: TestCase) {
    this.problem = testCase.problem;
    this.caseNumber = testCase.caseNumber;
    this.testInput = testCase.testInput;
    this.testOutput = testCase.testOutput;
    this.createdAt = testCase.createdAt;
    this.updatedAt = testCase.updatedAt;
  }
}
