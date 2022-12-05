import { Test, TestingModule } from '@nestjs/testing';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockUserRepository } from '../mock/user.mock';
import { MockSolvedRepository } from '../mock/solved.mock';
import { Solved } from '../solved/entities/solved.entity';
import { User } from '../users/entities/user.entity';

describe('RankController', () => {
  let rankController: RankController;
  let rankService: RankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankController],
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

    rankController = module.get<RankController>(RankController);
    rankService = module.get<RankService>(RankService);
  });

  it('should be defined', () => {
    expect(rankService).toBeDefined();
    expect(rankController).toBeDefined();
  });
});
