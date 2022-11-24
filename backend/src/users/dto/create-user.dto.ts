import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '로그인 아이디' })
  loginId: string;

  @ApiProperty({ description: '비밀번호' })
  password: string;

  constructor(loginId, password) {
    this.loginId = loginId;
    this.password = password;
  }
}
