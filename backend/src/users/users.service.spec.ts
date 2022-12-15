import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { SimpleUserDto } from './dto/simple-user.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockUserRepository } from '../mock/user.mock';
import { MockRepository } from '../mock/common.mock';
import { createTestUser } from '../utils/utils.test';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: MockRepository<User>;

  let userId: number;
  let loginId: string;
  let password: string;
  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: MockUserRepository() },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));

    userId = 1;
    loginId = 'loginId1';
    password = '12341234';

    user = await createTestUser(userId, loginId, password);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('create: 사용자 생성 성공', async () => {
    // 검색 하였을 때 찾은 결과가 없어야 한다.
    const userRepositoryFindOneBySpy = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    // 검색 하였을 때 찾은 결과가 없어야 한다.
    jest.spyOn(userRepository, 'save').mockResolvedValue(user);
    const createUserDto = new CreateUserDto(loginId, password);
    const simpleUserDto = await userService.create(createUserDto);

    expect(userRepositoryFindOneBySpy).toBeCalledWith({ loginId: loginId });

    // password는 암호화되고 같은 암호를 암화화해도 같지 않기 때문에 단순 비교할 수 없다.
    // expect(userRepositorySaveSpy).toBeCalledWith(
    //   User.createUser({
    //     loginId: loginId,
    //     password: await bcrypt.hash(password, 10),
    //     userStatus: 0,
    //   }),
    // );
    expect(userRepositoryFindOneBySpy).toBeCalled();
    expect(simpleUserDto).toEqual(new SimpleUserDto(user));
  });

  it('create: 사용자 생성 실패 - 아이디가 빈 문자열', async () => {
    const createUserDto = new CreateUserDto('', password);
    const simpleUserDto = await userService.create(createUserDto);

    expect(simpleUserDto).toEqual(null);
  });

  it('create: 사용자 생성 실패 - 아이디가 undefined', async () => {
    const createUserDto = new CreateUserDto(undefined, password);
    const simpleUserDto = await userService.create(createUserDto);

    expect(simpleUserDto).toEqual(null);
  });

  it('create: 사용자 생성 실패 - 아이디가 null', async () => {
    const createUserDto = new CreateUserDto(null, password);
    const simpleUserDto = await userService.create(createUserDto);

    expect(simpleUserDto).toEqual(null);
  });

  it('create: 사용자 생성 실패 - 존재하는 사용자', async () => {
    // 우선 저장한다.
    const createUserDto = new CreateUserDto(loginId, password);

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositorySaveBySpy = jest
      .spyOn(userRepository, 'save')
      .mockResolvedValue(mockedUser);

    const simpleUserDto1 = await userService.create(createUserDto);

    // 검색했을 떄 찾은 결과가 있는 경우
    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const simpleUserDto2 = await userService.create(createUserDto);

    expect(userRepositoryFindOneBySpy1).toBeCalledWith({ loginId: loginId });
    expect(userRepositoryFindOneBySpy2).toBeCalledWith({ loginId: loginId });
    expect(simpleUserDto1).toEqual(new SimpleUserDto(mockedUser));
    expect(simpleUserDto2).toEqual(null);
  });

  it('foundUser: 검색 성공 - userId가 정상, loginId를 비워둠', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const foundSimpleUserDto = await userService.findOneUser({
      userId: userId,
    });

    expect(userRepositoryFindOneBySpy1).toBeCalledWith({ id: userId });
    expect(userRepositoryFindOneBySpy2).toBeCalledWith({ id: userId });
    expect(savedSimpleUserDto.loginId).toEqual(foundSimpleUserDto.loginId);
  });

  it('foundUser: 검색 성공 - userId가 정상, loginId가 undefined', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const foundSimpleUserDto = await userService.findOneUser({
      userId: userId,
    });

    expect(userRepositoryFindOneBySpy1).toBeCalledWith({
      id: userId,
      loginId: undefined,
    });
    expect(userRepositoryFindOneBySpy2).toBeCalledWith({
      id: userId,
      loginId: undefined,
    });
    expect(savedSimpleUserDto.loginId).toEqual(foundSimpleUserDto.loginId);
  });

  it('foundUser: 검색 성공 - userId가 정상, loginId가 null', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const foundSimpleUserDto = await userService.findOneUser({
      userId: userId,
      loginId: null,
    });

    expect(userRepositoryFindOneBySpy1).toBeCalledWith({
      id: userId,
      loginId: null,
    });
    expect(userRepositoryFindOneBySpy2).toBeCalledWith({
      id: userId,
      loginId: null,
    });
    expect(savedSimpleUserDto.loginId).toEqual(foundSimpleUserDto.loginId);
  });

  it('foundUser: 검색 성공 - loginId가 정상, userId를 비워둠', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const foundSimpleUserDto = await userService.findOneUser({
      loginId: loginId,
    });

    expect(userRepositoryFindOneBySpy1).toBeCalledWith({ loginId: loginId });
    expect(userRepositoryFindOneBySpy2).toBeCalledWith({ loginId: loginId });
    expect(savedSimpleUserDto.loginId).toEqual(foundSimpleUserDto.loginId);
  });

  it('foundUser: 검색 성공 - loginId가 정상, userId가 undefined', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const foundSimpleUserDto = await userService.findOneUser({
      userId: undefined,
      loginId: loginId,
    });

    expect(userRepositoryFindOneBySpy1).toBeCalledWith({
      id: undefined,
      loginId: loginId,
    });
    expect(userRepositoryFindOneBySpy2).toBeCalledWith({
      id: undefined,
      loginId: loginId,
    });
    expect(savedSimpleUserDto.loginId).toEqual(foundSimpleUserDto.loginId);
  });

  it('foundUser: 검색 성공 - loginId가 정상, userId가 null', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const foundSimpleUserDto = await userService.findOneUser({
      userId: null,
      loginId: loginId,
    });

    expect(userRepositoryFindOneBySpy1).toBeCalledWith({
      id: null,
      loginId: loginId,
    });
    expect(userRepositoryFindOneBySpy2).toBeCalledWith({
      id: null,
      loginId: loginId,
    });
    expect(savedSimpleUserDto.loginId).toEqual(foundSimpleUserDto.loginId);
  });

  it('foundUser: 검색 성공 - userId와 loginId가 모두 정상', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const foundSimpleUserDto = await userService.findOneUser({
      userId: userId,
      loginId: loginId,
    });

    expect(userRepositoryFindOneBySpy1).toBeCalledWith({
      id: userId,
      loginId: loginId,
    });
    expect(userRepositoryFindOneBySpy2).toBeCalledWith({
      id: userId,
      loginId: loginId,
    });
    expect(savedSimpleUserDto.loginId).toEqual(foundSimpleUserDto.loginId);
  });

  it('foundUser: 검색 실패 - 잘못된 userId와 loginId가 비어있음', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    const foundSimpleUserDto = await userService.findOneUser({
      userId: 2,
    });

    // 저장되는 경우
    // expect(userRepositoryFindOneBySpy1).toBeCalledWith({
    //   id: userId,
    //   loginId: loginId,
    // });

    expect(userRepositoryFindOneBySpy2).toBeCalledWith({
      id: 2,
      loginId: undefined,
    });

    expect(foundSimpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - 잘못된 userId와 loginId가 정상', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    // 저장되는 경우
    expect(userRepositoryFindOneBySpy1).toBeCalledWith({
      loginId: loginId,
    });

    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    const foundSimpleUserDto = await userService.findOneUser({
      userId: 2,
      loginId: loginId,
    });

    expect(userRepositoryFindOneBySpy2).toBeCalledWith({
      id: 2,
      loginId: loginId,
    });

    expect(foundSimpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - 잘못된 loginId와 userId가 비어있음', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    const foundSimpleUserDto = await userService.findOneUser({
      loginId: 'loginId2',
    });

    // 저장되는 경우
    expect(userRepositoryFindOneBySpy1).toBeCalledWith({
      loginId: loginId,
    });

    expect(userRepositoryFindOneBySpy2).toBeCalledWith({ loginId: 'loginId2' });

    expect(foundSimpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - 잘못된 loginId와 userId가 정상', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    const foundSimpleUserDto = await userService.findOneUser({
      userId: userId,
      loginId: 'loginId2',
    });

    // 저장되는 경우
    expect(userRepositoryFindOneBySpy1).toBeCalledWith({
      loginId: loginId,
    });

    expect(userRepositoryFindOneBySpy2).toBeCalledWith({
      id: 1,
      loginId: 'loginId2',
    });

    expect(foundSimpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - 잘못된 userId와 loginId', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    const foundSimpleUserDto = await userService.findOneUser({
      userId: 2,
      loginId: 'loginId2',
    });

    // 저장되는 경우
    expect(userRepositoryFindOneBySpy1).toBeCalledWith({
      loginId: loginId,
    });

    expect(userRepositoryFindOneBySpy2).toBeCalledWith({
      id: 2,
      loginId: 'loginId2',
    });

    expect(foundSimpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - userId가 null, loginId를 비워둠', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const foundSimpleUserDto = await userService.findOneUser({
      userId: null,
    });

    // 저장되는 경우
    expect(userRepositoryFindOneBySpy1).toBeCalledWith({
      loginId: loginId,
    });

    expect(foundSimpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - loginId가 null, userId를 비워둠', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const foundSimpleUserDto = await userService.findOneUser({
      userId: null,
    });

    // 저장되는 경우
    expect(userRepositoryFindOneBySpy1).toBeCalledWith({
      loginId: loginId,
    });

    expect(foundSimpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - userId와 loginId를 비워둠', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const foundSimpleUserDto = await userService.findOneUser({});

    // 저장되는 경우
    expect(userRepositoryFindOneBySpy1).toBeCalledWith({
      loginId: loginId,
    });

    expect(foundSimpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - userId와 loginId가 undefined', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const foundSimpleUserDto = await userService.findOneUser({
      userId: undefined,
      loginId: undefined,
    });

    // 저장되는 경우
    expect(userRepositoryFindOneBySpy1).toBeCalledWith({
      loginId: loginId,
    });

    expect(foundSimpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - userId와 loginId가 null', async () => {
    const createUserDto = new CreateUserDto(loginId, password);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const mockedUser = User.createUser({
      loginId: createUserDto.loginId,
      password: hashedPassword,
      userStatus: 0,
    });

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    jest.spyOn(userRepository, 'save').mockResolvedValue(mockedUser);

    const savedSimpleUserDto = await userService.create(createUserDto);

    const foundSimpleUserDto = await userService.findOneUser({
      userId: null,
      loginId: null,
    });

    // 저장되는 경우
    expect(userRepositoryFindOneBySpy1).toBeCalledWith({
      loginId: loginId,
    });

    expect(foundSimpleUserDto).toEqual(null);
  });
});
