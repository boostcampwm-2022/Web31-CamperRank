import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SimpleUserDto } from './dto/simple-user.dto';
import { IFindUserOption } from './dto/find-option-user.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const foundUsers = await this.usersRepository.find({
      where: {
        loginId: createUserDto.loginId,
      },
    });

    if (foundUsers.length > 0) {
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
    const foundUsers = await this.usersRepository.find({
      where: {
        id: userId,
        loginId: loginId,
      },
    });

    return foundUsers.length === 1 ? new SimpleUserDto(foundUsers[0]) : null;
  }
}
