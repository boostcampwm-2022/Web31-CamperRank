import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { TypeOrmExModule } from '../typeorm/typeorm-ex.module';
import { ProblemRepository } from './problem.repository';

@Module({
  controllers: [ProblemController],
  providers: [ProblemService],
  imports: [
    TypeOrmExModule.forCustomRepository([ProblemRepository]), // CustomRepository 를 사용하기 위해 추가
  ],
})
export class ProblemModule {}
