import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';

export class CreateTestCaseDto {
  @ApiProperty({ description: '문제 식별 아이디' })
  @IsNotEmpty()
  problemId: number;

  @ApiProperty({ description: '테스트 케이스 번호' })
  @Min(1)
  @IsNotEmpty()
  caseNumber: number;

  @ApiProperty({ description: '테스트 케이스 입력' })
  @IsNotEmpty()
  testInput: string;

  @ApiProperty({ description: '테스트 케이스 출력' })
  @IsNotEmpty()
  testOutput: string;

  constructor(problemId, caseNumber, testInput, testOutput) {
    this.problemId = problemId;
    this.caseNumber = caseNumber;
    this.testInput = testInput;
    this.testOutput = testOutput;
  }
}
