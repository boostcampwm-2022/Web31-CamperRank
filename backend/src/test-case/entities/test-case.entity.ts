import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Problem } from '../../problem/entities/problem.entity';
import { BaseTimeEntity } from '../../commons/entities/baseTime.entity';

@Entity()
export class TestCase extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Problem, (problem) => problem.testcaseList)
  problem: Problem;

  @Column({ name: 'case_number' })
  caseNumber: number;

  @Column({ name: 'test_input' })
  testInput: string;

  @Column({ name: 'test_output' })
  testOutput: string;

  public static createTestCase({ problem, caseNumber, testInput, testOutput }) {
    const testCase = new TestCase();
    testCase.problem = problem;
    testCase.caseNumber = caseNumber;
    testCase.testInput = testInput;
    testCase.testOutput = testOutput;
    return testCase;
  }
}
