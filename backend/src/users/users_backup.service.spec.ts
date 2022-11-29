// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './entities/user.entity';
// import { SimpleUserDto } from './dto/simple-user.dto';
// import { getRepositoryToken } from '@nestjs/typeorm';
//
// class MockUserRepository {
//   async findOneBy({ id, loginId }) {
//     const user = User.createUser({ loginId, password: '123', userStatus: 0 });
//     user.id = id || 1;
//     return user;
//   }
//
//   async save(user: User) {
//     user.id = 1;
//     const now = new Date();
//     user.createdAt = now;
//     user.updatedAt = now;
//     return user;
//   }
// }
//
// describe('UsersService', () => {
//   let userService: UsersService;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UsersService,
//         {
//           provide: getRepositoryToken(User),
//           useClass: MockUserRepository,
//         },
//       ],
//     }).compile();
//
//     userService = module.get<UsersService>(UsersService);
//   });
//
//   it('should be defined', () => {
//     expect(userService).toBeDefined();
//   });
//
//   it('controller에서 정상적인 입력에 대한 검증을 마치고 호출된 service의 create를 성공한다.', async () => {
//     const createUserDto = new CreateUserDto('loginId1', '12341234');
//     const user = User.createUser({
//       loginId: createUserDto.loginId,
//       password: createUserDto.password,
//       userStatus: 0,
//     });
//     user.id = 1;
//     const simpleUserDto = new SimpleUserDto(user);
//     const userRepositoryCreateSpy = jest
//       .spyOn(userService, 'create')
//       .mockResolvedValue(simpleUserDto);
//
//     const result = await userService.create(createUserDto);
//     expect(userRepositoryCreateSpy).toHaveBeenCalledWith(createUserDto);
//     expect(result).toEqual(simpleUserDto);
//   });
//
//   it('foundUser()를 호출하여 처리', () => {
//     expect(userService).toBeDefined();
//   });
//
//   it('foundUser({userId)를 호출하여 처리', () => {
//     expect(userService).toBeDefined();
//   });
//
//   it('foundUser({loginId})를 호출하여 처리', () => {
//     expect(userService).toBeDefined();
//   });
//
//   it('foundUser({userId, loginId})를 호출하여 처리', () => {
//     expect(userService).toBeDefined();
//   });
// });
