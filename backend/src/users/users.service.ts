import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SimpleUserDto } from './dto/simple-user.dto';
import { IFindUserOption } from './dto/find-option-user.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isFalsy } from '../utils/boolUtils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (isFalsy(createUserDto.loginId) || isFalsy(createUserDto.password)) {
      return null;
    }

    const foundUsers = await this.usersRepository.findOneBy({
      loginId: createUserDto.loginId,
    });

    if (foundUsers !== null) {
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

  async findOneUser({ userId, loginId }: IFindUserOption) {
    if (isFalsy(userId) && isFalsy(loginId)) {
      return null;
    }

    const foundUsers = await this.usersRepository.findOneBy({
      id: userId,
      loginId: loginId,
    });

    return foundUsers !== null ? new SimpleUserDto(foundUsers) : null;
  }
}
