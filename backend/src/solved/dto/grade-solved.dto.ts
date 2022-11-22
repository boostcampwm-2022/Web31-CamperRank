import { ApiProperty } from '@nestjs/swagger';
import { ProgrammingLanguage } from '../entities/ProgrammingLanguage.enum';
import { Solved } from '../entities/solved.entity';
import { TestCase } from '../../test-case/entities/test-case.entity';

export class GradeSolvedDto {
  @ApiProperty({ description: '제출 답안 아이디' })
  solvedId: number;

  @ApiProperty({ description: '문제 식별 아이디' })
  problemId: number;

  @ApiProperty({ description: '사용자 식별 아이디' })
  userId: number;

  @ApiProperty({ description: '사용자 제출 코드' })
  userCode: string;

  @ApiProperty({ description: '제출 코드 언어' })
  language: ProgrammingLanguage;

  @ApiProperty({ description: '테스트 케이스 아이디' })
  testCaseId: number;

  @ApiProperty({ description: '테스트 케이스 번호' })
  testCaseNumber: number;

  @ApiProperty({ description: '테스트 케이스 입력' })
  testCaseInput: string;

  @ApiProperty({ description: '테스트 케이스 출력' })
  testCaseOutput: string;

  constructor(solved: Solved, testCase: TestCase) {
    this.solvedId = solved.id;
    this.problemId = solved.problem.id;
    this.userId = solved.user.id;
    this.userCode = solved.userCode;
    this.language = solved.language;

    this.testCaseId = testCase.id;
    this.testCaseNumber = testCase.caseNumber;
    this.testCaseInput = testCase.testInput;
    this.testCaseOutput = testCase.testOutput;
  }
}
