import { Test, TestingModule } from '@nestjs/testing';
import { SolvedController } from './solved.controller';
import { SolvedService } from './solved.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Solved } from './entities/solved.entity';
import { MockSolvedRepository } from '../mock/solved.mock';
import { Problem } from '../problem/entities/problem.entity';
import { TestCase } from '../test-case/entities/test-case.entity';
import { User } from '../users/entities/user.entity';
import { MockProblemRepository } from '../mock/problem.mock';
import { MockTestCaseRepository } from '../mock/test-case.mock';
import { MockUserRepository } from '../mock/user.mock';

describe('SolvedController', () => {
  let solvedController: SolvedController;
  let solvedService: SolvedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [SolvedController],
      providers: [
        SolvedService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(() => of({})),
            get: jest.fn(() => of({})),
          },
        },
        {
          provide: getRepositoryToken(Solved),
          useValue: MockSolvedRepository(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: MockUserRepository(),
        },
        {
          provide: getRepositoryToken(Problem),
          useValue: MockProblemRepository(),
        },
        {
          provide: getRepositoryToken(TestCase),
          useValue: MockTestCaseRepository(),
        },
      ],
    }).compile();

    solvedService = module.get<SolvedService>(SolvedService);
    solvedController = module.get<SolvedController>(SolvedController);
  });

  it('should be defined', () => {
    expect(solvedService).toBeDefined();
    expect(solvedController).toBeDefined();
  });
});
