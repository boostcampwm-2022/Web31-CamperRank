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
        'A + B = ?',
        1,
        JSON.stringify(
          `
<div>
<h4>문제 내용</h4>
<div>A와 B의 합을 출력하시오</div><br>
<h4>입력 형태</h4>
<div>A와 B</div><br>
<h4>출력 형태</h4>
<div>A와 B의 합</div><br>
<h4>제한 사항</h4>
<p>0 <= A <= 10</p>
<p>0 <= B <= 10</p><br>
<h4>예시 입력#1</h4>
<div>[3, 5]</div><br>
<h4>예시 출력#1</h4>
<div>[8]</div><br>
<h4>예시 입력#2</h4>
<div>[9, 9]</div><br>
<h4>예시 출력#2</h4>
<div>[18]</div>
</div>
`.replace(/\n/g, ''),
        ),
      ),
    );

    const simpleProblemDto2 = await this.problemService.create(
      new CreateProblemDto(
        'A * B = ?',
        2,
        JSON.stringify(
          `
<div>
<h4>문제 내용</h4>
<div>A와 B의 곱을 출력하시오</div><br>
<h4>입력 형태</h4>
<div>A와 B</div><br>
<h4>출력 형태</h4>
<div>A와 B의 곱</div><br>
<h4>제한 사항</h4>
<p>0 <= A <= 10</p>
<p>0 <= B <= 10</p><br>
<h4>예시 입력#1</h4>
<div>[3, 5]</div><br>
<h4>예시 출력#1</h4>
<div>[15]</div><br>
<h4>예시 입력#2</h4>
<div>[9, 9]</div><br>
<h4>예시 출력#2</h4>
<div>[81]</div>
</div>
`.replace(/\n/g, ''),
        ),
      ),
    );

    const simpleProblemDto3 = await this.problemService.create(
      new CreateProblemDto(
        'A / B = ?',
        2,
        JSON.stringify(
          `
<div>
<h4>문제 내용</h4>
<div>A에서 B를 나눈 값을 출력하시오</div><br>
<h4>입력 형태</h4>
<div>A와 B</div><br>
<h4>출력 형태</h4>
<div>A / B 의 몫</div><br>
<h4>제한 사항</h4>
<p>0 <= A <= 10</p>
<p>0 <= B <= 10</p><br>
<h4>예시 입력#1</h4>
<div>[15, 3]</div><br>
<h4>예시 출력#1</h4>
<div>[5]</div><br>
<h4>예시 입력#2</h4>
<div>[9, 9]</div><br>
<h4>예시 출력#2</h4>
<div>[1]</div>
</div>
`.replace(/\n/g, ''),
        ),
      ),
    );

    const simpleProblemDto4 = await this.problemService.create(
      new CreateProblemDto(
        'A % B = ?',
        2,
        JSON.stringify(
          `
<div>
<h4>문제 내용</h4>
<div>A % B을 출력하시오</div><br>
<h4>입력 형태</h4>
<div>A와 B</div><br>
<h4>출력 형태</h4>
<div>A % B</div><br>
<h4>제한 사항</h4>
<p>0 <= A <= 10</p>
<p>0 <= B <= 10</p><br>
<h4>예시 입력#1</h4>
<div>[15, 3]</div><br>
<h4>예시 출력#1</h4>
<div>[0]</div><br>
<h4>예시 입력#2</h4>
<div>[9, 8]</div><br>
<h4>예시 출력#2</h4>
<div>[1]</div>
</div>
`.replace(/\n/g, ''),
        ),
      ),
    );

    const simpleProblemDto5 = await this.problemService.create(
      new CreateProblemDto(
        'A ** B = ?',
        3,
        JSON.stringify(
          `
<div>
<h4>문제 내용</h4>
<div>A의 B제곱 을 출력하시오</div><br>
<h4>입력 형태</h4>
<div>A와 B</div><br>
<h4>출력 형태</h4>
<div>A의 B제곱</div><br>
<h4>제한 사항</h4>
<p>0 <= A <= 10</p>
<p>0 <= B <= 5</p><br>
<h4>예시 입력#1</h4>
<div>[3, 3]</div><br>
<h4>예시 출력#1</h4>
<div>[27]</div><br>
<h4>예시 입력#2</h4>
<div>[10, 1]</div><br>
<h4>예시 출력#2</h4>
<div>[100]</div>
</div>
`.replace(/\n/g, ''),
        ),
      ),
    );

    const simpleProblemDto6 = await this.problemService.create(
      new CreateProblemDto(
        'A + B + C = ?',
        3,
        JSON.stringify(
          `
<div>
<h4>문제 내용</h4>
<div>A, B, C의 합 을 출력하시오</div><br>
<h4>입력 형태</h4>
<div>A와 B와 C</div><br>
<h4>출력 형태</h4>
<div>A의 B와 C의 합</div><br>
<h4>제한 사항</h4>
<p>0 <= A <= 10</p>
<p>0 <= B <= 10</p>
<p>0 <= C <= 10</p><br>
<h4>예시 입력#1</h4>
<div>[3, 3, 9]</div><br>
<h4>예시 출력#1</h4>
<div>[15]</div><br>
<h4>예시 입력#2</h4>
<div>[10, 1, 9]</div><br>
<h4>예시 출력#2</h4>
<div>[20]</div>
</div>
`.replace(/\n/g, ''),
        ),
      ),
    );

    const simpleProblemDto7 = await this.problemService.create(
      new CreateProblemDto(
        'A + B - C = ?',
        3,
        JSON.stringify(
          `
<div>
<h4>문제 내용</h4>
<div>A + B - C의 값 을 출력하시오</div><br>
<h4>입력 형태</h4>
<div>A와 B와 C</div><br>
<h4>출력 형태</h4>
<div>A + B - C의 값</div><br>
<h4>제한 사항</h4>
<p>0 <= A <= 10</p>
<p>0 <= B <= 10</p>
<p>0 <= C <= 10</p><br>
<h4>예시 입력#1</h4>
<div>[3, 3, 3]</div><br>
<h4>예시 출력#1</h4>
<div>[6]</div><br>
<h4>예시 입력#2</h4>
<div>[10, 6, 9]</div><br>
<h4>예시 출력#2</h4>
<div>[7]</div>
</div>
`.replace(/\n/g, ''),
        ),
      ),
    );

    const simpleProblemDto8 = await this.problemService.create(
      new CreateProblemDto(
        'A + B * C = ?',
        3,
        JSON.stringify(
          `
<div>
<h4>문제 내용</h4>
<div>A + B * C의 값 을 출력하시오</div><br>
<h4>입력 형태</h4>
<div>A와 B와 C</div><br>
<h4>출력 형태</h4>
<div>A + B * C의 값</div><br>
<h4>제한 사항</h4>
<p>0 <= A <= 10</p>
<p>0 <= B <= 10</p>
<p>0 <= C <= 10</p><br>
<h4>예시 입력#1</h4>
<div>[3, 3, 3]</div><br>
<h4>예시 출력#1</h4>
<div>[12]</div><br>
<h4>예시 입력#2</h4>
<div>[10, 5, 5]</div><br>
<h4>예시 출력#2</h4>
<div>[35]</div>
</div>
`.replace(/\n/g, ''),
        ),
      ),
    );

    const simpleProblemDto9 = await this.problemService.create(
      new CreateProblemDto(
        'A + B / C = ?',
        3,
        JSON.stringify(
          `
<div>
<h4>문제 내용</h4>
<div>A + B / C의 값 을 출력하시오</div><br>
<h4>입력 형태</h4>
<div>A와 B와 C</div><br>
<h4>출력 형태</h4>
<div>A + B / C의 값</div><br>
<h4>제한 사항</h4>
<p>0 <= A <= 10</p>
<p>0 <= B <= 10</p>
<p>0 <= C <= 10</p><br>
<h4>예시 입력#1</h4>
<div>[3, 3, 3]</div><br>
<h4>예시 출력#1</h4>
<div>[4]</div><br>
<h4>예시 입력#2</h4>
<div>[10, 10, 5]</div><br>
<h4>예시 출력#2</h4>
<div>[12]</div>
</div>
`.replace(/\n/g, ''),
        ),
      ),
    );

    const simpleProblemDto10 = await this.problemService.create(
      new CreateProblemDto(
        'A * B * C = ?',
        3,
        JSON.stringify(
          `
<div>
<h4>문제 내용</h4>
<div>A * B * C의 값 을 출력하시오</div><br>
<h4>입력 형태</h4>
<div>A와 B와 C</div><br>
<h4>출력 형태</h4>
<div>A * B * C의 값</div><br>
<h4>제한 사항</h4>
<p>0 <= A <= 10</p>
<p>0 <= B <= 10</p>
<p>0 <= C <= 10</p><br>
<h4>예시 입력#1</h4>
<div>[3, 3, 3]</div><br>
<h4>예시 출력#1</h4>
<div>[27]</div><br>
<h4>예시 입력#2</h4>
<div>[10, 10, 5]</div><br>
<h4>예시 출력#2</h4>
<div>[500]</div>
</div>
`.replace(/\n/g, ''),
        ),
      ),
    );

    const simpleProblemDto11 = await this.problemService.create(
      new CreateProblemDto(
        'A - B - C = ?',
        3,
        JSON.stringify(
          `
<div>
<h4>문제 내용</h4>
<div>A - B - C의 값 을 출력하시오</div><br>
<h4>입력 형태</h4>
<div>A와 B와 C</div><br>
<h4>출력 형태</h4>
<div>A - B - C의 값</div><br>
<h4>제한 사항</h4>
<p>0 <= A <= 10</p>
<p>0 <= B <= 10</p>
<p>0 <= C <= 10</p><br>
<h4>예시 입력#1</h4>
<div>[3, 3, 3]</div><br>
<h4>예시 출력#1</h4>
<div>[-3]</div><br>
<h4>예시 입력#2</h4>
<div>[10, 10, 5]</div><br>
<h4>예시 출력#2</h4>
<div>[15]</div>
</div>
`.replace(/\n/g, ''),
        ),
      ),
    );

    const simpleProblemDtoDemo = await this.problemService.create(
      new CreateProblemDto(
        '동전',
        3,
        JSON.stringify(
          `
<div>
<h4>문제 내용</h4>
<div>10원, 50원, 100원짜리 동전을 적절히 사용해서 그 합을 A원으로 만드려고 한다.</div>
<div>동전들을 적절히 사용하여, A원을 만들기 위한 최소의 동전 개수 B를 구하시오. </div>
<div>이때, 각각의 동전은 무한하게 사용할 수 있다.</div>
<br>
<h4>입력 형태</h4>
<div>만드려는 동전의 액수 A</div><br>
<h4>출력 형태</h4>
<div>동전의 최소 개수 B</div><br>
<h4>제한 사항</h4>
<p>0 <= A <= 1000</p>
<p>0 <= B <= 100</p><br>
<h4>예시 입력#1</h4>
<div>[1000]</div><br>
<h4>예시 출력#1</h4>
<div>[10]</div><br>
<h4>예시 입력#2</h4>
<div>[170]</div><br>
<h4>예시 출력#2</h4>
<div>[3]</div>
</div>
    `.replace(/\n/g, ''),
        ),
      ),
    );

    //A + B
    const simpleTestCaseDto1 = await this.testCaseService.create(
      new CreateTestCaseDto(1, 1, JSON.stringify([1, 2]), JSON.stringify(3)),
    );

    const simpleTestCaseDto2 = await this.testCaseService.create(
      new CreateTestCaseDto(1, 2, JSON.stringify([6, 7]), JSON.stringify(13)),
    );

    const simpleTestCaseDto3 = await this.testCaseService.create(
      new CreateTestCaseDto(1, 3, JSON.stringify([10, 10]), JSON.stringify(20)),
    );

    //A * B
    const simpleTestCaseDto4 = await this.testCaseService.create(
      new CreateTestCaseDto(2, 1, JSON.stringify([3, 2]), JSON.stringify(6)),
    );

    const simpleTestCaseDto5 = await this.testCaseService.create(
      new CreateTestCaseDto(2, 2, JSON.stringify([6, 7]), JSON.stringify(42)),
    );

    const simpleTestCaseDto6 = await this.testCaseService.create(
      new CreateTestCaseDto(
        2,
        3,
        JSON.stringify([10, 10]),
        JSON.stringify(100),
      ),
    );

    //A / B
    const simpleTestCaseDto7 = await this.testCaseService.create(
      new CreateTestCaseDto(3, 1, JSON.stringify([4, 2]), JSON.stringify(2)),
    );

    const simpleTestCaseDto8 = await this.testCaseService.create(
      new CreateTestCaseDto(3, 2, JSON.stringify([10, 2]), JSON.stringify(5)),
    );

    const simpleTestCaseDto9 = await this.testCaseService.create(
      new CreateTestCaseDto(3, 3, JSON.stringify([10, 5]), JSON.stringify(2)),
    );

    //A % B
    const simpleTestCaseDto10 = await this.testCaseService.create(
      new CreateTestCaseDto(4, 1, JSON.stringify([4, 2]), JSON.stringify(0)),
    );

    const simpleTestCaseDto11 = await this.testCaseService.create(
      new CreateTestCaseDto(4, 2, JSON.stringify([10, 7]), JSON.stringify(3)),
    );

    const simpleTestCaseDto12 = await this.testCaseService.create(
      new CreateTestCaseDto(4, 3, JSON.stringify([9, 5]), JSON.stringify(4)),
    );

    //A ** B
    const simpleTestCaseDto13 = await this.testCaseService.create(
      new CreateTestCaseDto(5, 1, JSON.stringify([4, 2]), JSON.stringify(16)),
    );

    const simpleTestCaseDto14 = await this.testCaseService.create(
      new CreateTestCaseDto(
        5,
        2,
        JSON.stringify([10, 3]),
        JSON.stringify(1000),
      ),
    );

    const simpleTestCaseDto15 = await this.testCaseService.create(
      new CreateTestCaseDto(5, 3, JSON.stringify([3, 2]), JSON.stringify(9)),
    );

    //A + B + C
    const simpleTestCaseDto16 = await this.testCaseService.create(
      new CreateTestCaseDto(6, 1, JSON.stringify([4, 2, 3]), JSON.stringify(9)),
    );

    const simpleTestCaseDto17 = await this.testCaseService.create(
      new CreateTestCaseDto(
        6,
        2,
        JSON.stringify([10, 3, 9]),
        JSON.stringify(22),
      ),
    );

    const simpleTestCaseDto18 = await this.testCaseService.create(
      new CreateTestCaseDto(
        6,
        3,
        JSON.stringify([7, 7, 9]),
        JSON.stringify(23),
      ),
    );

    //A + B - C
    const simpleTestCaseDto19 = await this.testCaseService.create(
      new CreateTestCaseDto(7, 1, JSON.stringify([4, 2, 3]), JSON.stringify(3)),
    );

    const simpleTestCaseDto20 = await this.testCaseService.create(
      new CreateTestCaseDto(7, 2, JSON.stringify([9, 3, 9]), JSON.stringify(3)),
    );

    const simpleTestCaseDto21 = await this.testCaseService.create(
      new CreateTestCaseDto(7, 3, JSON.stringify([7, 7, 9]), JSON.stringify(5)),
    );

    //A + B * C
    const simpleTestCaseDto22 = await this.testCaseService.create(
      new CreateTestCaseDto(
        8,
        1,
        JSON.stringify([4, 2, 3]),
        JSON.stringify(10),
      ),
    );

    const simpleTestCaseDto23 = await this.testCaseService.create(
      new CreateTestCaseDto(8, 2, JSON.stringify([3, 3, 2]), JSON.stringify(9)),
    );

    const simpleTestCaseDto24 = await this.testCaseService.create(
      new CreateTestCaseDto(8, 3, JSON.stringify([2, 2, 2]), JSON.stringify(6)),
    );

    //A + B / C
    const simpleTestCaseDto25 = await this.testCaseService.create(
      new CreateTestCaseDto(9, 1, JSON.stringify([4, 3, 3]), JSON.stringify(4)),
    );

    const simpleTestCaseDto26 = await this.testCaseService.create(
      new CreateTestCaseDto(9, 2, JSON.stringify([3, 3, 1]), JSON.stringify(6)),
    );

    const simpleTestCaseDto27 = await this.testCaseService.create(
      new CreateTestCaseDto(9, 3, JSON.stringify([2, 4, 2]), JSON.stringify(4)),
    );

    //A * B * C
    const simpleTestCaseDto28 = await this.testCaseService.create(
      new CreateTestCaseDto(
        10,
        1,
        JSON.stringify([4, 2, 3]),
        JSON.stringify(24),
      ),
    );

    const simpleTestCaseDto29 = await this.testCaseService.create(
      new CreateTestCaseDto(
        10,
        2,
        JSON.stringify([3, 3, 2]),
        JSON.stringify(18),
      ),
    );

    const simpleTestCaseDto30 = await this.testCaseService.create(
      new CreateTestCaseDto(
        10,
        3,
        JSON.stringify([2, 4, 2]),
        JSON.stringify(16),
      ),
    );

    //A - B - C
    const simpleTestCaseDto31 = await this.testCaseService.create(
      new CreateTestCaseDto(
        11,
        1,
        JSON.stringify([4, 2, 3]),
        JSON.stringify(-1),
      ),
    );

    const simpleTestCaseDto32 = await this.testCaseService.create(
      new CreateTestCaseDto(
        11,
        2,
        JSON.stringify([5, 3, 2]),
        JSON.stringify(0),
      ),
    );

    const simpleTestCaseDto33 = await this.testCaseService.create(
      new CreateTestCaseDto(
        11,
        3,
        JSON.stringify([8, 4, 2]),
        JSON.stringify(2),
      ),
    );

    const simpleTEstCaseDemoDto1 = await this.testCaseService.create(
      new CreateTestCaseDto(
        simpleProblemDtoDemo.problemId,
        1,
        JSON.stringify([150]),
        JSON.stringify(2),
      ),
    );

    const simpleTEstCaseDemoDto2 = await this.testCaseService.create(
      new CreateTestCaseDto(
        simpleProblemDtoDemo.problemId,
        2,
        JSON.stringify([90]),
        JSON.stringify(5),
      ),
    );

    const simpleTEstCaseDemoDto3 = await this.testCaseService.create(
      new CreateTestCaseDto(
        simpleProblemDtoDemo.problemId,
        3,
        JSON.stringify([40]),
        JSON.stringify(4),
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
