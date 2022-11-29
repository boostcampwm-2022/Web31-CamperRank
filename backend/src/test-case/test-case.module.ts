import { Module } from '@nestjs/common';
import { TestCaseService } from './test-case.service';
import { TestCaseController } from './test-case.controller';
import { TypeOrmExModule } from '../typeorm/typeorm-ex.module';
import { TestCaseRepository } from './test-case.repository';
import { ProblemRepository } from '../problem/problem.repository';

@Module({
  imports: [
    // TypeOrmModule.forFeature([TestCase, Problem]),
    TypeOrmExModule.forCustomRepository([
      TestCaseRepository,
      ProblemRepository,
    ]),
  ],
  controllers: [TestCaseController],
  providers: [TestCaseService],
  exports: [TestCaseService],
})
export class TestCaseModule {}
