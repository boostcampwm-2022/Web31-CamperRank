import { Module } from '@nestjs/common';
import { SolvedService } from './solved.service';
import { SolvedController } from './solved.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solved } from './entities/solved.entity';
import { Problem } from '../problem/entities/problem.entity';
import { User } from '../users/entities/user.entity';
import { TestCase } from '../test-case/entities/test-case.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Solved, Problem, User, TestCase]),
    HttpModule,
  ],
  controllers: [SolvedController],
  providers: [SolvedService],
  exports: [SolvedService],
})
export class SolvedModule {}
