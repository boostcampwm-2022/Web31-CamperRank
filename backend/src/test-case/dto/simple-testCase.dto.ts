import { TestCase } from '../entities/test-case.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SimpleTestCaseDto {
  @ApiProperty({ description: '문제 식별 아이디' })
  problemId: number;

  @ApiProperty({ description: '테스트 케이스 번호' })
  caseNumber: number;

  @ApiProperty({ description: '테스트 케이스 입력' })
  testInput: string;

  @ApiProperty({ description: '테스트 케이스 출력' })
  testOutput: string;

  @ApiProperty({ description: '테스트 케이스 생성일' })
  createdAt: Date;

  @ApiProperty({ description: '테스트 케이스 수정일' })
  updatedAt: Date;

  constructor(testCase: TestCase) {
    this.problemId = testCase.problem.id;
    this.caseNumber = testCase.caseNumber;
    this.testInput = testCase.testInput;
    this.testOutput = testCase.testOutput;
    this.createdAt = testCase.createdAt;
    this.updatedAt = testCase.updatedAt;
  }
}
