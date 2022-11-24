import { ApiProperty } from '@nestjs/swagger';
import { SolvedResult } from '../entities/SolvedResult.enum';
import { ProgrammingLanguage } from '../entities/ProgrammingLanguage.enum';

export class CreateSolvedDto {
  @ApiProperty({ description: '문제 식별 아이디' })
  problemId: number;

  @ApiProperty({ description: '사용자 식별 아이디' })
  userId: number;

  @ApiProperty({ description: '사용자 제출 코드' })
  userCode: string;

  @ApiProperty({ description: '제출 코드 언어' })
  language: ProgrammingLanguage;

  @ApiProperty({ description: '정답 제출 결과' })
  result: SolvedResult;

  constructor(problemId, userId, userCode, language, result) {
    this.problemId = problemId;
    this.userId = userId;
    this.userCode = userCode;
    this.language = language;
    this.result = result;
  }
}
