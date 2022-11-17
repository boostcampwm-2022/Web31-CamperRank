import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SimpleUserDto {
  @ApiProperty({ description: '사용자 식별 아이디' })
  userId: number;

  @ApiProperty({ description: '로그인 아이디' })
  loginId: string;

  @ApiProperty({ description: '사용자 상태' })
  userStatus: number;

  @ApiProperty({ description: '가입일' })
  createdAt: Date;

  @ApiProperty({ description: '정보 수정일' })
  updatedAt: Date;

  constructor(user: User) {
    this.userId = user.id;
    this.loginId = user.loginId;
    this.userStatus = user.userStatus;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
