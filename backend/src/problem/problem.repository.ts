import { Repository } from 'typeorm';
import { CustomRepository } from '../typeorm/typeorm-ex.decorator';
import { Problem } from './entities/problem.entity';

@CustomRepository(Problem)
export class ProblemRepository extends Repository<Problem> {
  public async saveProblem(problem: Problem) {
    return await this.save(problem);
  }

  public async findProblemById(problemId: number) {
    return await this.findOneBy({ id: problemId });
  }

  public async findProblems() {
    return await this.find();
  }

  public async removeProblem(problemId: number) {
    const problem = await this.findOneBy({ id: problemId });
    return await this.remove(problem);
  }

  //TODO: Problem 수정해야 한다.
}
