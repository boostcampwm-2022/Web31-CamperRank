import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SimpleUserDto } from './dto/simple-user.dto';
import { FindUserOption } from './dto/findUser.option';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

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
