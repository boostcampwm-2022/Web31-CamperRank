import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { TestCaseService } from './test-case/test-case.service';
import { UsersService } from './users/users.service';
import { ProblemService } from './problem/problem.service';
import { SolvedService } from './solved/solved.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { CreateProblemDto } from './problem/dto/create-problem.dto';
import { CreateTestCaseDto } from './test-case/dto/create-test-case.dto';
import { CreateSolvedDto } from './solved/dto/create-solved.dto';
import { ProgrammingLanguage } from './solved/entities/ProgrammingLanguage.enum';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly testCaseService: TestCaseService,
    private readonly usersService: UsersService,
    private readonly problemService: ProblemService,
    private readonly solvedService: SolvedService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('dummy')
  async createDummy() {
    const simpleUserDto1 = await this.usersService.create(
      new CreateUserDto('loginId1', '12341234'),
    );

    const simpleUserDto2 = await this.usersService.create(
      new CreateUserDto('loginId2', '12341234'),
    );

    const simpleUserDto3 = await this.usersService.create(
      new CreateUserDto('loginId3', '12341234'),
    );

    const simpleProblemDto1 = await this.problemService.create(
      new CreateProblemDto(
        'problem1',
        1,
        JSON.stringify(`<div><div>문제 내용</div><div>답은 111</div></div>`),
      ),
    );

    const simpleProblemDto2 = await this.problemService.create(
      new CreateProblemDto(
        'problem2',
        2,
        JSON.stringify(`<div><div>문제 내용</div><div>답은 222</div></div>`),
      ),
    );

    const simpleProblemDto3 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        JSON.stringify(`<div><div>문제 내용</div><div>답은 333</div></div>`),
      ),
    );

    const simpleProblemDto4 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        JSON.stringify(`<div><div>문제 내용</div><div>답은 333</div></div>`),
      ),
    );

    const simpleProblemDto5 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        JSON.stringify(`<div><div>문제 내용</div><div>답은 333</div></div>`),
      ),
    );

    const simpleProblemDto6 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        JSON.stringify(`<div><div>문제 내용</div><div>답은 333</div></div>`),
      ),
    );

    const simpleProblemDto7 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        JSON.stringify(`<div><div>문제 내용</div><div>답은 333</div></div>`),
      ),
    );

    const simpleProblemDto8 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        JSON.stringify(`<div><div>문제 내용</div><div>답은 333</div></div>`),
      ),
    );

    const simpleProblemDto9 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        JSON.stringify(`<div><div>문제 내용</div><div>답은 333</div></div>`),
      ),
    );

    const simpleProblemDto10 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        JSON.stringify(`<div><div>문제 내용</div><div>답은 333</div></div>`),
      ),
    );

    const simpleTestCaseDto1 = await this.testCaseService.create(
      new CreateTestCaseDto(1, 1, JSON.stringify([123]), JSON.stringify(111)),
    );

    const simpleTestCaseDto2 = await this.testCaseService.create(
      new CreateTestCaseDto(1, 2, JSON.stringify([234]), JSON.stringify(111)),
    );

    const simpleTestCaseDto3 = await this.testCaseService.create(
      new CreateTestCaseDto(1, 3, JSON.stringify([345]), JSON.stringify(111)),
    );

    const simpleTestCaseDto4 = await this.testCaseService.create(
      new CreateTestCaseDto(2, 1, JSON.stringify(['123']), JSON.stringify(222)),
    );

    const simpleTestCaseDto5 = await this.testCaseService.create(
      new CreateTestCaseDto(
        2,
        2,
        JSON.stringify(['123 456']),
        JSON.stringify(222),
      ),
    );

    const simpleTestCaseDto6 = await this.testCaseService.create(
      new CreateTestCaseDto(
        2,
        3,
        JSON.stringify(['123 456 789']),
        JSON.stringify(222),
      ),
    );

    const simpleTestCaseDto7 = await this.testCaseService.create(
      new CreateTestCaseDto(
        3,
        1,
        JSON.stringify([[1, 2], [3, 4], 5]),
        JSON.stringify(15),
      ),
    );

    const simpleTestCaseDto8 = await this.testCaseService.create(
      new CreateTestCaseDto(
        3,
        2,
        JSON.stringify([[6, 7], [8, 9], 10]),
        JSON.stringify(40),
      ),
    );

    const simpleTestCaseDto9 = await this.testCaseService.create(
      new CreateTestCaseDto(
        3,
        3,
        JSON.stringify([[10, 11, 12], [13, 14], 15]),
        JSON.stringify(75),
      ),
    );

    const simpleTestCaseDto10 = await this.testCaseService.create(
      new CreateTestCaseDto(
        4,
        1,
        JSON.stringify([[1, 2], [3, 4], 5]),
        JSON.stringify([3, 7, 5]),
      ),
    );

    const simpleTestCaseDto11 = await this.testCaseService.create(
      new CreateTestCaseDto(
        4,
        2,
        JSON.stringify([[6, 7], [8, 9], 10]),
        JSON.stringify([13, 17, 10]),
      ),
    );

    const simpleTestCaseDto12 = await this.testCaseService.create(
      new CreateTestCaseDto(
        4,
        3,
        JSON.stringify([[10, 11, 12], [13, 14], 15]),
        JSON.stringify([33, 27, 15]),
      ),
    );

    const simpleSolvedDto1 = await this.solvedService.create(
      new CreateSolvedDto(
        1,
        'loginId1',
        'function solution() { return 111; }',
        ProgrammingLanguage.JavaScript,
      ),
    );

    const simpleSolvedDto2 = await this.solvedService.create(
      new CreateSolvedDto(
        2,
        'loginId1',
        'function solution() { return 222; }',
        ProgrammingLanguage.JavaScript,
      ),
    );

    const simpleSolvedDto3 = await this.solvedService.create(
      new CreateSolvedDto(
        3,
        'loginId1',
        'function solution() { return 333; }',
        ProgrammingLanguage.JavaScript,
      ),
    );

    const simpleSolvedDto4 = await this.solvedService.create(
      new CreateSolvedDto(
        1,
        'loginId1',
        'function solution() { return 111; }',
        ProgrammingLanguage.JavaScript,
      ),
    );

    const simpleSolvedDto5 = await this.solvedService.create(
      new CreateSolvedDto(
        2,
        'loginId2',
        'function solution() { return 222; }',
        ProgrammingLanguage.JavaScript,
      ),
    );

    const simpleSolvedDto6 = await this.solvedService.create(
      new CreateSolvedDto(
        3,
        'loginId2',
        'function solution() { return 333; }',
        ProgrammingLanguage.JavaScript,
      ),
    );

    const simpleSolvedDto7 = await this.solvedService.create(
      new CreateSolvedDto(
        1,
        'loginId3',
        'function solution() { return 111; }',
        ProgrammingLanguage.JavaScript,
      ),
    );

    const simpleSolvedDto8 = await this.solvedService.create(
      new CreateSolvedDto(
        2,
        'loginId2',
        'function solution() { return 222; }',
        ProgrammingLanguage.JavaScript,
      ),
    );

    const simpleSolvedDto9 = await this.solvedService.create(
      new CreateSolvedDto(
        3,
        'loginId3',
        'function solution() { return 333; }',
        ProgrammingLanguage.JavaScript,
      ),
    );

    return {
      resultCode: HttpStatus.OK,
    };
  }
}
