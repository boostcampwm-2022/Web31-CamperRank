import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // UsersRepository를 재작성하거나 재사용하려는 부분이 많을 것 같아서 만들었다.
  // 만역에 굳이 repository 단에서 재사용할 메서드를 만들지 않아도 된다면 InjectRepository 를 사용하는 것이 더 좋을 것 같다.
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //TODO: 약속된 규격을 따르는 loginId와 password가 넘어온 상태로 이미 존재하는 회원인지 확인한다.
    try {
      const user = User.createUser({
        loginId: createUserDto.loginId,
        password: await bcrypt.hash(createUserDto.password, 10),
        userStatus: 0,
      });
      const savedUser = await this.usersRepository.save(user);
      //TODO: 반환 값에 대한 정의가 되어있지 않아서 임시방편으로 로그를 찍고 그대로 반환한다.
      console.log(savedUser);
      return {
        result: true,
        loginId: user.loginId,
        userStatus: user.userStatus,
      };
    } catch (e) {
      return { result: false, msg: '존재하지 않는 아이디' };
    }
  }

  async findUserByLoginId(loginId: string) {
    try {
      return await this.usersRepository.findOneBy({
        loginId: loginId,
      });
    } catch (e) {
      console.error(e);
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
