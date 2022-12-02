import { CustomRepository } from '../typeorm/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Solved } from './entities/solved.entity';

@CustomRepository(Solved)
export class SolvedRepository extends Repository<Solved> {}
