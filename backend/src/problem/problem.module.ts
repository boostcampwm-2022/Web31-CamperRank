import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { TypeOrmExModule } from '../typeorm/typeorm-ex.module';
import { ProblemRepository } from './problem.repository';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Problem]),
    TypeOrmExModule.forCustomRepository([ProblemRepository]),
  ],
  controllers: [ProblemController],
  providers: [ProblemService],
  exports: [ProblemService],
})
export class ProblemModule {}
