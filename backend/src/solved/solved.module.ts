import { Module } from '@nestjs/common';
import { SolvedService } from './solved.service';
import { SolvedController } from './solved.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solved } from './entities/solved.entity';
import { Problem } from '../problem/entities/problem.entity';
import { User } from '../users/entities/user.entity';
import { TestCase } from '../test-case/entities/test-case.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Solved, Problem, User, TestCase]),
    HttpModule,
    // BullModule.forRoot({
    //   redis: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // }),
    // BullModule.registerQueue({
    //   name: 'gradeQueue',
    // }),
  ],
  controllers: [SolvedController],
  providers: [SolvedService],
  exports: [SolvedService],
})
export class SolvedModule {}
