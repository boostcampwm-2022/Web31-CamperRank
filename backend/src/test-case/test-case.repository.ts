import { CustomRepository } from '../typeorm/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { TestCase } from './entities/test-case.entity';

@CustomRepository(TestCase)
export class TestCaseRepository extends Repository<TestCase> {}
