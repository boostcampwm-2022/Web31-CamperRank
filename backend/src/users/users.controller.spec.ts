// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './entities/user.entity';
// import { SimpleUserDto } from './dto/simple-user.dto';
// import { getRepositoryToken } from '@nestjs/typeorm';
//
// class MockUserService {
//   async create(createUserDto: CreateUserDto) {
//     const user = User.createUser({
//       loginId: createUserDto.loginId,
//       password: createUserDto.password,
//       userStatus: 0,
//     });
//     user.id = 1;
//     return new SimpleUserDto(user);
//   }
//
//   async findUser({ userId, loginId }) {
//     const user = User.createUser({ loginId, password: '123', userStatus: 0 });
//     user.id = userId;
//     return new SimpleUserDto(user);
//   }
// }
//
// describe('UsersController', () => {
//   let userController: UsersController;
//   let userService: UsersService;
//   jest.mock('./users.service');
//   jest.mock('./users.controller');
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [
//         UsersService,
//         {
//           provide: getRepositoryToken(User),
//           useClass: MockUserService,
//         },
//       ],
//     }).compile();
//
//     userService = module.get<UsersService>(UsersService);
//     userController = module.get<UsersController>(UsersController);
//   });
//
//   it('should be defined', () => {
//     expect(userService).toBeDefined();
//     expect(userController).toBeDefined();
//   });
// });
