import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

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
