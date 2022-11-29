import { ApiProperty } from '@nestjs/swagger';
import { ProgrammingLanguage } from '../entities/ProgrammingLanguage.enum';
import { IsNotEmpty } from 'class-validator';

export class CreateSolvedDto {
  @ApiProperty({ description: '문제 식별 아이디' })
  @IsNotEmpty()
  problemId: number;

  @ApiProperty({ description: '사용자 로그인 아이디' })
  @IsNotEmpty()
  loginId: string;

  @ApiProperty({ description: '사용자 제출 코드' })
  @IsNotEmpty()
  userCode: string;

  @ApiProperty({ description: '제출 코드 언어' })
  @IsNotEmpty()
  language: ProgrammingLanguage;

  constructor(problemId, loginId, userCode, language) {
    this.problemId = problemId;
    this.loginId = loginId;
    this.userCode = userCode;
    this.language = language;
  }
}
