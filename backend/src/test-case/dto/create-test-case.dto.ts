import { ApiProperty } from '@nestjs/swagger';

export class CreateTestCaseDto {
  @ApiProperty({ description: '문제 식별 아이디' })
  problemId: number;

  @ApiProperty({ description: '테스트 케이스 번호' })
  caseNumber: number;

  @ApiProperty({ description: '테스트 케이스 입력' })
  testInput: string;

  @ApiProperty({ description: '테스트 케이스 출력' })
  testOutput: string;

  constructor(problemId, caseNumber, testInput, testOutput) {
    this.problemId = problemId;
    this.caseNumber = caseNumber;
    this.testInput = testInput;
    this.testOutput = testOutput;
  }
}
