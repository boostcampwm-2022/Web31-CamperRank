import { Test, TestingModule } from '@nestjs/testing';
import { RankService } from './rank.service';
import { UserRepository } from '../users/user.repository';
import { SolvedRepository } from '../solved/solved.repository';

describe('RankService', () => {
  let rankService: RankService;
  let userRepository: UserRepository;
  let solvedRepository: SolvedRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RankService, UserRepository, SolvedRepository],
    }).compile();

    rankService = module.get<RankService>(RankService);
    userRepository = module.get<UserRepository>(UserRepository);
    solvedRepository = module.get<SolvedRepository>(SolvedRepository);
  });

  it('should be defined', () => {
    expect(solvedRepository).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(rankService).toBeDefined();
  });
});
