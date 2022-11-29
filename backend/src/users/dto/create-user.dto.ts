import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '로그인 아이디' })
  @Matches(/[a-z0-9]{6,20}/)
  @IsNotEmpty()
  loginId: string;

  @ApiProperty({ description: '비밀번호' })
  @Matches(/[a-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,20}/)
  @IsNotEmpty()
  password: string;

  constructor(loginId, password) {
    this.loginId = loginId;
    this.password = password;
  }
}
