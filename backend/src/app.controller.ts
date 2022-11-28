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
import { SolvedResult } from './solved/entities/SolvedResult.enum';

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
      new CreateUserDto('test1', '1234'),
    );

    const simpleUserDto2 = await this.usersService.create(
      new CreateUserDto('test2', '1234'),
    );

    const simpleUserDto3 = await this.usersService.create(
      new CreateUserDto('test3', '1234'),
    );

    const simpleProblemDto1 = await this.problemService.create(
      new CreateProblemDto(
        'problem1',
        1,
        '<div><div>문제 내용</div><div>답은 111</div></div>',
      ),
    );

    const simpleProblemDto2 = await this.problemService.create(
      new CreateProblemDto(
        'problem2',
        2,
        '<div><div>문제 내용</div><div>답은 222</div></div>',
      ),
    );

    const simpleProblemDto3 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        '<div><div>문제 내용</div><div>답은 333</div></div>',
      ),
    );

    const simpleProblemDto4 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        '<div><div>문제 내용</div><div>답은 333</div></div>',
      ),
    );

    const simpleProblemDto5 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        '<div><div>문제 내용</div><div>답은 333</div></div>',
      ),
    );

    const simpleProblemDto6 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        '<div><div>문제 내용</div><div>답은 333</div></div>',
      ),
    );

    const simpleProblemDto7 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        '<div><div>문제 내용</div><div>답은 333</div></div>',
      ),
    );

    const simpleProblemDto8 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        '<div><div>문제 내용</div><div>답은 333</div></div>',
      ),
    );

    const simpleProblemDto9 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        '<div><div>문제 내용</div><div>답은 333</div></div>',
      ),
    );

    const simpleProblemDto10 = await this.problemService.create(
      new CreateProblemDto(
        'problem3',
        3,
        '<div><div>문제 내용</div><div>답은 333</div></div>',
      ),
    );

    const simpleTestCaseDto1 = await this.testCaseService.create(
      new CreateTestCaseDto(1, 1, '123', '111'),
    );

    const simpleTestCaseDto2 = await this.testCaseService.create(
      new CreateTestCaseDto(1, 2, '234', '111'),
    );

    const simpleTestCaseDto3 = await this.testCaseService.create(
      new CreateTestCaseDto(1, 3, '345', '111'),
    );

    const simpleTestCaseDto4 = await this.testCaseService.create(
      new CreateTestCaseDto(2, 1, `'123'`, '222'),
    );

    const simpleTestCaseDto5 = await this.testCaseService.create(
      new CreateTestCaseDto(2, 2, `'234'`, '222'),
    );

    const simpleTestCaseDto6 = await this.testCaseService.create(
      new CreateTestCaseDto(2, 3, `'345'`, '222'),
    );

    const simpleTestCaseDto7 = await this.testCaseService.create(
      new CreateTestCaseDto(3, 1, '1 2\n3 4\n5', '15'),
    );

    const simpleTestCaseDto8 = await this.testCaseService.create(
      new CreateTestCaseDto(3, 2, '6 7\n8 9\n10', '40'),
    );

    const simpleTestCaseDto9 = await this.testCaseService.create(
      new CreateTestCaseDto(3, 3, '10 11\n12 13 14\n15', '75'),
    );

    const simpleSolvedDto1 = await this.solvedService.create(
      new CreateSolvedDto(
        1,
        1,
        'function solution() { return 111; }',
        ProgrammingLanguage.JavaScript,
        SolvedResult.Ready,
      ),
    );

    const simpleSolvedDto2 = await this.solvedService.create(
      new CreateSolvedDto(
        2,
        1,
        'function solution() { return 222; }',
        ProgrammingLanguage.JavaScript,
        SolvedResult.Ready,
      ),
    );

    const simpleSolvedDto3 = await this.solvedService.create(
      new CreateSolvedDto(
        3,
        1,
        'function solution() { return 333; }',
        ProgrammingLanguage.JavaScript,
        SolvedResult.Ready,
      ),
    );

    const simpleSolvedDto4 = await this.solvedService.create(
      new CreateSolvedDto(
        1,
        1,
        'function solution() { return 111; }',
        ProgrammingLanguage.JavaScript,
        SolvedResult.Ready,
      ),
    );

    const simpleSolvedDto5 = await this.solvedService.create(
      new CreateSolvedDto(
        2,
        2,
        'function solution() { return 222; }',
        ProgrammingLanguage.JavaScript,
        SolvedResult.Ready,
      ),
    );

    const simpleSolvedDto6 = await this.solvedService.create(
      new CreateSolvedDto(
        3,
        2,
        'function solution() { return 333; }',
        ProgrammingLanguage.JavaScript,
        SolvedResult.Ready,
      ),
    );

    const simpleSolvedDto7 = await this.solvedService.create(
      new CreateSolvedDto(
        1,
        3,
        'function solution() { return 111; }',
        ProgrammingLanguage.JavaScript,
        SolvedResult.Ready,
      ),
    );

    const simpleSolvedDto8 = await this.solvedService.create(
      new CreateSolvedDto(
        2,
        2,
        'function solution() { return 222; }',
        ProgrammingLanguage.JavaScript,
        SolvedResult.Ready,
      ),
    );

    const simpleSolvedDto9 = await this.solvedService.create(
      new CreateSolvedDto(
        3,
        3,
        'function solution() { return 333; }',
        ProgrammingLanguage.JavaScript,
        SolvedResult.Ready,
      ),
    );

    return {
      resultCode: HttpStatus.OK,
    };
  }
}
