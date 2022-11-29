import { CustomRepository } from '../typeorm/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Problem } from './entities/problem.entity';

@CustomRepository(Problem)
export class ProblemRepository extends Repository<Problem> {}
