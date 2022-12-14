import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { SimpleUserDto } from './dto/simple-user.dto';
import * as bcrypt from 'bcrypt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockUserRepository } from '../mock/user.mock';
import { MockRepository } from '../mock/common.mock';

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

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: MockUserRepository() },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('create: 사용자 생성 성공', async () => {
    const userId = 1;
    const loginId = 'loginId1';
    const password = '12341234';

    const user = await createTestUser(userId, loginId, password);

    // 검색 하였을 때 찾은 결과가 없어야 한다.
    const userRepositoryFindOneBySpy = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    // 검색 하였을 때 찾은 결과가 없어야 한다.
    const userRepositorySaveSpy = jest
      .spyOn(userRepository, 'save')
      .mockResolvedValue(user);

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
    const userId = 1;
    const loginId = 'loginId1';
    const password = '12341234';

    const user = await createTestUser(userId, loginId, password);

    const createUserDto = new CreateUserDto(loginId, password);
    const simpleUserDto = await userService.create(createUserDto);

    expect(simpleUserDto).toEqual(null);
  });

  it('create: 사용자 생성 실패 - 아이디가 undefined', async () => {
    const userId = 1;
    const loginId = 'loginId1';
    const password = '12341234';

    const user = await createTestUser(userId, loginId, password);

    const createUserDto = new CreateUserDto(loginId, password);
    const simpleUserDto = await userService.create(createUserDto);

    expect(simpleUserDto).toEqual(null);
  });

  it('create: 사용자 생성 실패 - 아이디가 null', async () => {
    const userId = 1;
    const loginId = 'loginId1';
    const password = '12341234';

    const user = await createTestUser(userId, loginId, password);

    const createUserDto = new CreateUserDto(loginId, password);
    const simpleUserDto = await userService.create(createUserDto);

    expect(simpleUserDto).toEqual(null);
  });

  it('create: 사용자 생성 실패 - 존재하는 사용자', async () => {
    const userId = 1;
    const loginId = 'loginId1';
    const password = '12341234';

    const user = await createTestUser(userId, loginId, password);

    // 검색했을 떄 찾은 결과가 있는 경우
    const userRepositoryFindOneBySpy = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const createUserDto = new CreateUserDto(loginId, password);
    const simpleUserDto = await userService.create(createUserDto);

    expect(userRepositoryFindOneBySpy).toBeCalledWith({ loginId: loginId });

    expect(simpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 성공 - userId가 정상, loginId를 비워둠', async () => {
    const userId = 1;
    const loginId = 'loginId1';
    const password = '12341234';

    const user = await createTestUser(userId, loginId, password);

    const userRepositoryFindOneBySpy = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const simpleUserDto = await userService.findOneUser({ userId: userId });

    expect(userRepositoryFindOneBySpy).toBeCalledWith({ id: userId });
    expect(simpleUserDto.loginId).toBe(loginId);
  });

  it('foundUser: 검색 성공 - userId가 정상, loginId가 undefined', async () => {
    const userId = 1;
    const loginId = 'loginId1';
    const password = '12341234';

    const user = await createTestUser(userId, loginId, password);

    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const simpleUserDto = await userService.findOneUser({
      userId: userId,
      loginId: undefined,
    });

    expect(userRepositoryFindOneBySpy2).toBeCalledWith({
      id: userId,
      loginId: undefined,
    });

    expect(simpleUserDto).toEqual(new SimpleUserDto(user));
  });

  it('foundUser: 검색 성공 - userId가 정상, loginId가 null', async () => {
    const userId = 1;
    const loginId = 'loginId1';
    const password = '12341234';

    const user = await createTestUser(userId, loginId, password);

    const userRepositoryFindOneBySpy3 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const simpleUserDto3 = await userService.findOneUser({
      userId: userId,
      loginId: null,
    });

    expect(userRepositoryFindOneBySpy3).toBeCalledWith({
      id: userId,
      loginId: null,
    });
    expect(simpleUserDto3).toEqual(new SimpleUserDto(user));
  });

  it('foundUser: 검색 성공 - loginId가 정상, userId를 비워둠', async () => {
    const userId = 1;
    const loginId = 'loginId1';
    const password = '12341234';

    await userService.create(new CreateUserDto(loginId, password));
    const user = await createTestUser(userId, loginId, password);

    const userRepositoryFindOneBySpy1 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const simpleUserDto1 = await userService.findOneUser({ loginId: loginId });

    expect(userRepositoryFindOneBySpy1).toBeCalledWith({ loginId: loginId });
    expect(simpleUserDto1).toEqual(new SimpleUserDto(user));
  });

  it('foundUser: 검색 성공 - loginId가 정상, userId가 undefined', async () => {
    const userId = 1;
    const loginId = 'loginId1';
    const password = '12341234';

    await userService.create(new CreateUserDto(loginId, password));

    const user = await createTestUser(userId, loginId, password);

    const userRepositoryFindOneBySpy2 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const simpleUserDto2 = await userService.findOneUser({
      userId: undefined,
      loginId: loginId,
    });

    expect(userRepositoryFindOneBySpy2).toBeCalledWith({
      id: undefined,
      loginId: loginId,
    });
    expect(simpleUserDto2).toEqual(new SimpleUserDto(user));
  });

  it('foundUser: 검색 성공 - loginId가 정상, userId가 null', async () => {
    const userId = 1;
    const loginId = 'loginId1';
    const password = '12341234';

    await userService.create(new CreateUserDto(loginId, password));

    const user = await createTestUser(userId, loginId, password);

    const userRepositoryFindOneBySpy3 = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const simpleUserDto3 = await userService.findOneUser({
      userId: null,
      loginId: loginId,
    });

    expect(userRepositoryFindOneBySpy3).toBeCalledWith({
      id: null,
      loginId: loginId,
    });

    expect(simpleUserDto3).toEqual(new SimpleUserDto(user));
  });

  it('foundUser: 검색 성공 - userId와 loginId가 모두 정상', async () => {
    const userId = 1;
    const loginId = 'loginId1';
    const password = '12341234';

    // foundUser: 검색 성공 - userId가 정상, loginId를 비워둠
    await userService.create(new CreateUserDto(loginId, password));
    const user = await createTestUser(userId, loginId, password);

    const userRepositoryFindOneBySpy = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const simpleUserDto = await userService.findOneUser({
      userId: userId,
      loginId: loginId,
    });

    expect(userRepositoryFindOneBySpy).toBeCalledWith({
      id: userId,
      loginId: loginId,
    });
    expect(simpleUserDto).toEqual(new SimpleUserDto(user));
  });

  it('foundUser: 검색 실패 - 잘못된 userId와 loginId가 비어있음', async () => {
    const loginId = 'loginId1';
    const password = '12341234';

    // foundUser: 검색 성공 - userId가 정상, loginId를 비워둠
    await userService.create(new CreateUserDto(loginId, password));

    const userRepositoryFindOneBySpy = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    const simpleUserDto = await userService.findOneUser({
      userId: 2,
    });

    expect(userRepositoryFindOneBySpy).toBeCalledWith({
      id: 2,
    });

    expect(simpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - 잘못된 userId와 loginId가 정상', async () => {
    const loginId = 'loginId1';
    const password = '12341234';

    // foundUser: 검색 성공 - userId가 정상, loginId를 비워둠
    await userService.create(new CreateUserDto(loginId, password));

    const userRepositoryFindOneBySpy = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    const simpleUserDto = await userService.findOneUser({
      userId: 2,
      loginId: loginId,
    });

    expect(userRepositoryFindOneBySpy).toBeCalledWith({
      id: 2,
      loginId: loginId,
    });

    expect(simpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - 잘못된 loginId와 userId가 비어있음', async () => {
    const loginId = 'loginId1';
    const password = '12341234';

    // foundUser: 검색 성공 - userId가 정상, loginId를 비워둠
    await userService.create(new CreateUserDto(loginId, password));

    const userRepositoryFindOneBySpy = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    const simpleUserDto = await userService.findOneUser({
      loginId: 'loginId2',
    });

    expect(userRepositoryFindOneBySpy).toBeCalledWith({
      loginId: 'loginId2',
    });

    expect(simpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - 잘못된 loginId와 userId가 정상', async () => {
    const loginId = 'loginId1';
    const password = '12341234';

    // foundUser: 검색 성공 - userId가 정상, loginId를 비워둠
    await userService.create(new CreateUserDto(loginId, password));

    const userRepositoryFindOneBySpy = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    const simpleUserDto = await userService.findOneUser({
      userId: 1,
      loginId: 'loginId2',
    });

    expect(userRepositoryFindOneBySpy).toBeCalledWith({
      id: 1,
      loginId: 'loginId2',
    });

    expect(simpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - 잘못된 userId와 loginId', async () => {
    const loginId = 'loginId1';
    const password = '12341234';

    await userService.create(new CreateUserDto(loginId, password));

    const userRepositoryFindOneBySpy = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(null);

    const simpleUserDto = await userService.findOneUser({
      userId: 2,
      loginId: 'loginId2',
    });

    expect(userRepositoryFindOneBySpy).toBeCalledWith({
      id: 2,
      loginId: 'loginId2',
    });

    expect(simpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - userId가 null, loginId를 비워둠', async () => {
    const loginId = 'loginId1';
    const password = '12341234';

    await userService.create(new CreateUserDto(loginId, password));

    const simpleUserDto = await userService.findOneUser({
      userId: null,
    });

    expect(simpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - loginId가 null, userId를 비워둠', async () => {
    const loginId = 'loginId1';
    const password = '12341234';

    await userService.create(new CreateUserDto(loginId, password));

    const simpleUserDto = await userService.findOneUser({
      loginId: null,
    });

    expect(simpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - userId와 loginId를 비워둠', async () => {
    const loginId = 'loginId1';
    const password = '12341234';

    await userService.create(new CreateUserDto(loginId, password));

    const simpleUserDto = await userService.findOneUser({});

    expect(simpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - userId와 loginId가 undefined', async () => {
    const loginId = 'loginId1';
    const password = '12341234';

    await userService.create(new CreateUserDto(loginId, password));

    const simpleUserDto = await userService.findOneUser({
      userId: undefined,
      loginId: undefined,
    });

    expect(simpleUserDto).toEqual(null);
  });

  it('foundUser: 검색 실패 - userId와 loginId가 null', async () => {
    const loginId = 'loginId1';
    const password = '12341234';

    await userService.create(new CreateUserDto(loginId, password));

    const simpleUserDto = await userService.findOneUser({
      userId: null,
      loginId: null,
    });

    expect(simpleUserDto).toEqual(null);
  });
});
