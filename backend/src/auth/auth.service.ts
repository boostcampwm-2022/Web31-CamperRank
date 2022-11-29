import { Injectable } from '@nestjs/common';
import { AuthUserDto } from '../users/dto/auth-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(authUserDto: AuthUserDto) {
    const { loginId, password } = authUserDto;
    const user = await this.userRepository.findOneBy({ loginId: loginId });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { loginId };
      const accessToken = this.jwtService.sign(payload);

      return {
        userId: loginId,
        accessToken,
        msg: 'success',
      };
    }
    return {
      msg: 'fail',
    };
  }
}
