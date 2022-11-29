import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { ProblemService } from './problem/problem.service';
import { SolvedService } from './solved/solved.service';
import { TestCaseService } from './test-case/test-case.service';
import { UserRepository } from './users/user.repository';
import { ProblemRepository } from './problem/problem.repository';
import { SolvedRepository } from './solved/solved.repository';
import { TestCaseRepository } from './test-case/test-case.repository';

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
        UserRepository,
        ProblemRepository,
        SolvedRepository,
        TestCaseRepository,
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
