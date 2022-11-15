import { Repository } from 'typeorm';
import { CustomRepository } from '../typeorm/typeorm-ex.decorator';
import { Problem } from './entities/problem.entity';

@CustomRepository(Problem)
export class ProblemRepository extends Repository<Problem> {
  public async saveProblem(problem: Problem) {
    return await this.save(problem);
  }

  public async findProblemById(id: number) {
    return await this.findOneBy({ id });
  }

  //TODO: Problem 수정해야 한다.
}
