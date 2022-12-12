import { ApiProperty } from '@nestjs/swagger';

export class SimpleRankDto {
  @ApiProperty({ description: '사용자 식별 아이디' })
  userId: number;

  @ApiProperty({ description: '사용자 로그인 아이디' })
  loginId: string;

  @ApiProperty({ description: '해결한 문제 수량' })
  solvedCount: number;

  constructor(userId, loginId, solvedCount) {
    this.userId = userId;
    this.loginId = loginId;
    this.solvedCount = solvedCount;
  }
}
