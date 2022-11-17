import { Module } from '@nestjs/common';
import { SolvedService } from './solved.service';
import { SolvedController } from './solved.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solved } from './entities/solved.entity';
import { Problem } from '../problem/entities/problem.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solved, Problem, User])],
  controllers: [SolvedController],
  providers: [SolvedService],
})
export class SolvedModule {}
