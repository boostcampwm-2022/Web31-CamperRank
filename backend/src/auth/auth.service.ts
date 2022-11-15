import { Injectable } from '@nestjs/common';
import { AuthUserDto } from '../users/dto/auth-user.dto';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async login(authUserDto: AuthUserDto) {
    const { loginId, password } = authUserDto;
    const user = await this.usersRepository.findUserByLoginId(loginId);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { loginId };
      const accesstoken = await this.jwtService.sign(payload);

      return JSON.stringify({
        userId: loginId,
        accesstoken,
        msg: '로그인 성공',
      });
    } else {
      return JSON.stringify({ msg: '로그인 실패' });
    }
  }
}
