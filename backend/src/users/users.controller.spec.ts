import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MockUserRepository } from '../mock/user.mock';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { SimpleUserDto } from './dto/simple-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

async function createTestUser(
  userId: number,
  loginId: string,
  password: string,
) {
  const user = User.createUser({
    loginId: loginId,
    password: await bcrypt.hash(password, 10),
    userStatus: 0,
  });

  user.id = userId;
  const now = new Date();
  user.createdAt = now;
  user.updatedAt = now;

  return user;
}

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: MockUserRepository() },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userController).toBeDefined();
  });

  it('signupUser: 사용자 생성 성공', async () => {
    const userId = 1;
    const loginId = 'loginId1';
    const password = '12341234';

    const user = await createTestUser(userId, loginId, password);
    const simpleUserDto = new SimpleUserDto(user);
    const userServiceCreateBySpy = jest
      .spyOn(userService, 'create')
      .mockResolvedValue(simpleUserDto);

    const createUserDto = new CreateUserDto(loginId, password);
    const result = await userController.signupUser(createUserDto);

    expect(userServiceCreateBySpy).toBeCalledWith(createUserDto);
    expect(result).toEqual(simpleUserDto);
  });

  it('signupUser: 사용자 생성 실패 - 정책에 맞지 않는 loginId', async () => {
    const userId = 1;
    const loginId = 'wrong';
    const password = '12341234';

    const userServiceCreateBySpy = jest
      .spyOn(userService, 'create')
      .mockResolvedValue(null);

    const createUserDto = new CreateUserDto(loginId, password);

    await expect(userController.signupUser(createUserDto)).rejects.toThrowError(
      new HttpException(
        '회원가입을 진행할 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      ),
    );
    expect(userServiceCreateBySpy).toBeCalledWith(createUserDto);
  });

  it('signupUser: 사용자 생성 실패 - loginId가 null', () => {});
  it('signupUser: 사용자 생성 실패 - loginId가 undefined', () => {});
  it('signupUser: 사용자 생성 실패 - 정책에 맞지 않는 password', () => {});
  it('signupUser: 사용자 생성 실패 - password가 null', () => {});
  it('signupUser: 사용자 생성 실패 - password가 undefined', () => {});
  it('signupUser: 사용자 생성 실패 - 입력 없음', () => {});
  it('', () => {});
});
