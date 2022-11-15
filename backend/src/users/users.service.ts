import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  // UsersRepository를 재작성하거나 재사용하려는 부분이 많을 것 같아서 만들었다.
  // 만역에 굳이 repository 단에서 재사용할 메서드를 만들지 않아도 된다면 InjectRepository 를 사용하는 것이 더 좋을 것 같다.
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //TODO: 약속된 규격을 따르는 loginId와 password가 넘어온 상태로 이미 존재하는 회원인지 확인한다.
    try {
      const user = User.createUser({
        loginId: createUserDto.loginId,
        password: await bcrypt.hash(createUserDto.password, 10),
        userStatus: 0,
      });
      const savedUser = await this.usersRepository.saveUser(user);
      //TODO: 반환 값에 대한 정의가 되어있지 않아서 임시방편으로 로그를 찍고 그대로 반환한다.
      console.log(savedUser);
      return savedUser;
    } catch (e) {
      return JSON.stringify({ msg: '이미 존재하는 아이디' });
    }
  }

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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
