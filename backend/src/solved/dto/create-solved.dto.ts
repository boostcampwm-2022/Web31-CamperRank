import { ApiProperty } from '@nestjs/swagger';

export class CreateSolvedDto {
  @ApiProperty({ description: '문제 식별 아이디' })
  problemId: number;

  @ApiProperty({ description: '사용자 식별 아이디' })
  userId: number;

  @ApiProperty({ description: '사용자 제출 코드' })
  userCode: string;

  @ApiProperty({ description: '정답 제출 결과' })
  result: boolean;
}
