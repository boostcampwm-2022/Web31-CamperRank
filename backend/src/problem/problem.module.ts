import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';

@Module({
  controllers: [ProblemController],
  providers: [ProblemService]
})
export class ProblemModule {}
