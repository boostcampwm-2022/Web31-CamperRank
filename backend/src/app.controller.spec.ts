import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { ProblemService } from './problem/problem.service';
import { SolvedService } from './solved/solved.service';
import { TestCaseService } from './test-case/test-case.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockUserRepository } from './mock/user.mock';
import { User } from './users/entities/user.entity';
import { Solved } from './solved/entities/solved.entity';
import { Problem } from './problem/entities/problem.entity';
import { TestCase } from './test-case/entities/test-case.entity';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        UsersService,
        ProblemService,
        SolvedService,
        TestCaseService,
        { provide: getRepositoryToken(User), useValue: MockUserRepository() },
        { provide: getRepositoryToken(Solved), useValue: MockUserRepository() },
        {
          provide: getRepositoryToken(Problem),
          useValue: MockUserRepository(),
        },
        {
          provide: getRepositoryToken(TestCase),
          useValue: MockUserRepository(),
        },
      ],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(AppController);
      expect(appController.getHello()).toBe('Hello World!');
      expect(app).toBeDefined();
    });
  });
});
