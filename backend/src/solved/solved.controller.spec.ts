import { Test, TestingModule } from '@nestjs/testing';
import { SolvedController } from './solved.controller';
import { SolvedService } from './solved.service';
import { SolvedRepository } from './solved.repository';
import { UserRepository } from '../users/user.repository';
import { ProblemRepository } from '../problem/problem.repository';
import { TestCaseRepository } from '../test-case/test-case.repository';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

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
        // HttpService,
        SolvedRepository,
        UserRepository,
        ProblemRepository,
        TestCaseRepository,
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
