import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class SimpleUserDto {
  @ApiProperty({ description: '사용자 식별 아이디' })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: '로그인 아이디' })
  @Length(6, 20)
  @IsNotEmpty()
  loginId: string;

  @ApiProperty({ description: '사용자 상태' })
  @IsNotEmpty()
  userStatus: number;

  @ApiProperty({ description: '가입일' })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({ description: '정보 수정일' })
  @IsNotEmpty()
  updatedAt: Date;

  constructor(user: User) {
    this.userId = user.id;
    this.loginId = user.loginId;
    this.userStatus = user.userStatus;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
