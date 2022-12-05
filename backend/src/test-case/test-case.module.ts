import { Module } from '@nestjs/common';
import { TestCaseService } from './test-case.service';
import { TestCaseController } from './test-case.controller';
import { TestCase } from './entities/test-case.entity';
import { Problem } from '../problem/entities/problem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TestCase, Problem])],
  controllers: [TestCaseController],
  providers: [TestCaseService],
  exports: [TestCaseService],
})
export class TestCaseModule {}
