import { Test, TestingModule } from '@nestjs/testing';
import { RankService } from './rank.service';
import { MockRepository } from '../mock/common.mock';
import { User } from '../users/entities/user.entity';
import { Solved } from '../solved/entities/solved.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockUserRepository } from '../mock/user.mock';
import { MockSolvedRepository } from '../mock/solved.mock';

describe('RankService', () => {
  let rankService: RankService;
  let userRepository: MockRepository<User>;
  let solvedRepository: MockRepository<Solved>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankService,
        {
          provide: getRepositoryToken(User),
          useValue: MockUserRepository(),
        },
        {
          provide: getRepositoryToken(Solved),
          useValue: MockSolvedRepository(),
        },
      ],
    }).compile();

    rankService = module.get<RankService>(RankService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
    solvedRepository = module.get<MockRepository<Solved>>(
      getRepositoryToken(Solved),
    );
  });

  it('should be defined', () => {
    expect(solvedRepository).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(rankService).toBeDefined();
  });
});
