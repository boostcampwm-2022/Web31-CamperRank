import { Solved } from '../entities/solved.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProgrammingLanguage } from '../entities/ProgrammingLanguage.enum';
import { SolvedResult } from '../entities/SolvedResult.enum';

export class SimpleSolvedDto {
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

  @ApiProperty({ description: '문제 풀이 제출 생성일' })
  createdAt: Date;

  @ApiProperty({ description: '문제 풀이 제출 변경일' })
  updatedAt: Date;

  constructor(solved: Solved) {
    this.problemId = solved.problem.id;
    this.userId = solved.user.id;
    this.userCode = solved.userCode;
    this.language = solved.language;
    this.result = solved.result;
    this.createdAt = solved.createdAt;
    this.updatedAt = solved.updatedAt;
  }
}
