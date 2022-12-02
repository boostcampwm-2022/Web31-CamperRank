import { Module } from '@nestjs/common';
import { SolvedService } from './solved.service';
import { SolvedController } from './solved.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmExModule } from '../typeorm/typeorm-ex.module';
import { SolvedRepository } from './solved.repository';
import { UserRepository } from '../users/user.repository';
import { TestCaseRepository } from '../test-case/test-case.repository';
import { ProblemRepository } from '../problem/problem.repository';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Solved, Problem, User, TestCase]),
    TypeOrmExModule.forCustomRepository([
      SolvedRepository,
      UserRepository,
      TestCaseRepository,
      ProblemRepository,
    ]),
    HttpModule,
  ],
  controllers: [SolvedController],
  providers: [SolvedService],
  exports: [SolvedService],
})
export class SolvedModule {}
