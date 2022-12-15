import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MockUserRepository } from '../mock/user.mock';
import { CreateUserDto } from './dto/create-user.dto';
import { SimpleUserDto } from './dto/simple-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createTestUser } from '../utils/utils.test';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  let userId: number;
  let loginId: string;
  let password: string;
  let user: User;

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

    userId = 1;
    loginId = 'loginId1';
    password = '12341234';

    user = await createTestUser(userId, loginId, password);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userController).toBeDefined();
  });

  it('signupUser: 사용자 생성 성공', async () => {
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
    loginId = 'wrong';

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

  it('signupUser: 사용자 생성 실패 - loginId가 null', async () => {
    loginId = null;

    const userServiceCreateBySpy = jest
      .spyOn(userService, 'create')
      .mockResolvedValue(null);

    const createUserDto = new CreateUserDto(null, password);

    await expect(userController.signupUser(createUserDto)).rejects.toThrowError(
      new HttpException(
        '회원가입을 진행할 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      ),
    );
    expect(userServiceCreateBySpy).toBeCalledWith(createUserDto);
  });

  it('signupUser: 사용자 생성 실패 - loginId가 undefined', async () => {
    loginId = undefined;

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

  it('signupUser: 사용자 생성 실패 - 정책에 맞지 않는 password', async () => {
    password = '1234';

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

  it('signupUser: 사용자 생성 실패 - password가 null', async () => {
    password = null;

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

  it('signupUser: 사용자 생성 실패 - password가 undefined', async () => {
    password = undefined;

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

  it('signupUser: 사용자 생성 실패 - loginId와 password가 undefined', async () => {
    loginId = undefined;
    password = undefined;

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

  it('signupUser: 사용자 생성 실패 - loginId와 password가 null', async () => {
    loginId = null;
    password = null;

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

  it('signupUser: 사용자 생성 실패 - loginId가 빈 문자열', async () => {
    loginId = '';

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

  it('signupUser: 사용자 생성 실패 - loginId가 공백 문자', async () => {
    loginId = ' ';

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

  it('signupUser: 사용자 생성 실패 - password가 빈 문자열', async () => {
    password = '';

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

  it('signupUser: 사용자 생성 실패 - password가 빈 문자열', async () => {
    password = ' ';

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

  it('findUser: 검색 성공 - 정상적인 입력', async () => {
    const simpleUserDto = new SimpleUserDto(user);
    const userServiceCreateBySpy = jest
      .spyOn(userService, 'create')
      .mockResolvedValue(simpleUserDto);

    const createUserDto = new CreateUserDto(loginId, password);
    await userService.create(createUserDto);

    const userServiceFindOneUserBySpy = jest
      .spyOn(userService, 'findOneUser')
      .mockResolvedValue(new SimpleUserDto(user));

    const result = await userController.findUser(loginId);

    expect(userServiceCreateBySpy).toBeCalledWith(createUserDto);
    expect(userServiceFindOneUserBySpy).toBeCalledWith({ loginId: loginId });
    expect(result).toEqual({ ...simpleUserDto, foundStatus: 1000 });
  });

  it('findUser: 검색 실패 - 비어있는 쿼리스트링', async () => {
    const simpleUserDto = new SimpleUserDto(user);
    const userServiceCreateBySpy = jest
      .spyOn(userService, 'create')
      .mockResolvedValue(simpleUserDto);

    const createUserDto = new CreateUserDto(loginId, password);
    await userService.create(createUserDto);
    jest
      .spyOn(userService, 'findOneUser')
      .mockResolvedValue(new SimpleUserDto(user));
    loginId = undefined;

    expect(userServiceCreateBySpy).toBeCalledWith(createUserDto);

    await expect(userController.findUser(loginId)).rejects.toThrowError(
      new HttpException('잘못된 요청입니다.', HttpStatus.BAD_REQUEST),
    );
  });

  it('findUser: 검색 실패 - 쿼리스트링 null', async () => {
    const simpleUserDto = new SimpleUserDto(user);
    const userServiceCreateBySpy = jest
      .spyOn(userService, 'create')
      .mockResolvedValue(simpleUserDto);

    const createUserDto = new CreateUserDto(loginId, password);
    await userService.create(createUserDto);
    jest
      .spyOn(userService, 'findOneUser')
      .mockResolvedValue(new SimpleUserDto(user));

    loginId = null;
    expect(userServiceCreateBySpy).toBeCalledWith(createUserDto);

    await expect(userController.findUser(loginId)).rejects.toThrowError(
      new HttpException('잘못된 요청입니다.', HttpStatus.BAD_REQUEST),
    );
  });

  it('findUser: 검색 실패 - 찾을 수 없는 사용자', async () => {
    const simpleUserDto = new SimpleUserDto(user);
    const userServiceCreateBySpy = jest
      .spyOn(userService, 'create')
      .mockResolvedValue(simpleUserDto);

    const createUserDto = new CreateUserDto(loginId, password);
    await userService.create(createUserDto);
    const userServiceFindOneUserBySpy = jest
      .spyOn(userService, 'findOneUser')
      .mockResolvedValue(null);

    loginId = 'loginId2';
    expect(userServiceCreateBySpy).toBeCalledWith(createUserDto);

    const result = await userController.findUser(loginId);

    expect(userServiceFindOneUserBySpy).toBeCalledWith({ loginId: loginId });
    expect(result).toEqual({ foundStatus: 1001 });
  });
});
