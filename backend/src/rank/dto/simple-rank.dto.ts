import { ApiProperty } from '@nestjs/swagger';

export class SimpleRankDto {
  @ApiProperty({ description: '사용자 식별 아이디' })
  userId: number;

  @ApiProperty({ description: '해결한 문제 수량' })
  solvedCount: number;

  constructor(userId, solvedCount) {
    this.userId = userId;
    this.solvedCount = solvedCount;
  }
}
