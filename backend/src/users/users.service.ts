import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SimpleUserDto } from './dto/simple-user.dto';
import { UserRepository } from './user.repository';
import { FindUserOption } from './dto/findUser.option';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  /**
   * 약속된 규격을 따르는 loginId,password 가 넘어온 상태로 이미 존재하는 회원인지 확인한다.
   * 회원 가입 중에서 발생할 수 있는 문제 중 db에서 정보를 가져와야 하는 경우에는 이곳에서 처리한다.
   * @param createUserDto
   * @returns {(null|SimpleUserDto)}
   */
  async create(createUserDto: CreateUserDto) {
    const foundUser = await this.usersRepository.findOneBy({
      loginId: createUserDto.loginId,
    });
    if (foundUser) {
      return null;
    }

    const savedUser = await this.usersRepository.save(
      User.createUser({
        loginId: createUserDto.loginId,
        password: await bcrypt.hash(createUserDto.password, 10),
        userStatus: 0,
      }),
    );
    return new SimpleUserDto(savedUser);
  }

  async findUserByLoginId({ loginId }) {
    const user = await this.usersRepository.findOneBy({
      loginId: loginId,
    });
    return user !== null ? new SimpleUserDto(user) : null;
  }

  async findUser({ userId, loginId }: FindUserOption) {
    const user = await this.usersRepository.findOneBy({
      id: userId,
      loginId: loginId,
    });
    return user !== null ? new SimpleUserDto(user) : null;
  }
}
