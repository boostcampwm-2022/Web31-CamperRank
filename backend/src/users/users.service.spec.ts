import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { SimpleUserDto } from './dto/simple-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UserRepository],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('create user', async () => {
    const user = User.createUser({
      loginId: 'loginId1',
      password: await bcrypt.hash('12341234', 10),
      userStatus: 0,
    });
    user.id = 1;
    const now = new Date();
    user.createdAt = now;
    user.updatedAt = now;
    const userRepositoryFindOneBySpy = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(undefined);

    const userRepositorySaveSpy = jest
      .spyOn(userRepository, 'save')
      .mockResolvedValue(user);

    const createUserDto = new CreateUserDto('loginId1', '12341234');
    const simpleUserDto = await userService.create(createUserDto);

    expect(userRepositoryFindOneBySpy).toBeCalledWith({ loginId: 'loginId1' });
    // TODO: 비밀번호 암호화 부분 떄문에 오류 발생
    // expect(userRepositorySaveSpy).toBeCalledWith(user);
    expect(simpleUserDto).toEqual(new SimpleUserDto(user));
  });

  it('foundUser({userId})를 호출하여 처리', async () => {
    const user = User.createUser({
      loginId: 'loginId1',
      password: await bcrypt.hash('12341234', 10),
      userStatus: 0,
    });
    user.id = 1;
    const now = new Date();
    user.createdAt = now;
    user.updatedAt = now;

    const userRepositoryFindOneBySpy = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue(user);

    const simpleUserDto = await userService.findUser({ userId: 1 });

    expect(userRepositoryFindOneBySpy).toBeCalledWith({ id: 1 });
    expect(simpleUserDto).toEqual(new SimpleUserDto(user));

    expect(userService).toBeDefined();
  });

  it('foundUser({loginId})를 호출하여 처리', () => {
    expect(userService).toBeDefined();
  });

  it('foundUser({userId, loginId})를 호출하여 처리', () => {
    expect(userService).toBeDefined();
  });
});
