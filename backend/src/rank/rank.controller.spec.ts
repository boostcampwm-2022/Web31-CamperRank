import { Test, TestingModule } from '@nestjs/testing';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { UserRepository } from '../users/user.repository';
import { SolvedRepository } from '../solved/solved.repository';

describe('RankController', () => {
  let rankController: RankController;
  let rankService: RankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankController],
      providers: [RankService, UserRepository, SolvedRepository],
    }).compile();

    rankController = module.get<RankController>(RankController);
    rankService = module.get<RankService>(RankService);
  });

  it('should be defined', () => {
    expect(rankService).toBeDefined();
    expect(rankController).toBeDefined();
  });
});
