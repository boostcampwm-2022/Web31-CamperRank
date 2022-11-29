import { ApiProperty } from '@nestjs/swagger';
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

  constructor(problemId, userId, userCode, language, result) {
    this.problemId = problemId;
    this.userId = userId;
    this.userCode = userCode;
    this.language = language;
  }
}
