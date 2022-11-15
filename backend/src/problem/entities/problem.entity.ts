import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../../commons/entities/baseTime.entity';
import { TestCase } from '../../test-case/entities/test-case.entity';
import { Solved } from '../../solved/entities/solved.entity';

@Entity()
export class Problem extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'input_format' })
  inputFormat: string;

  @Column()
  constraints: string;

  @Column({ name: 'sample_input' })
  sampleInput: string;

  @Column({ name: 'sample_output' })
  sampleOutput: string;

  @Column({ name: 'sample_explanation' })
  sampleExplanation: string;

  testcaseList: TestCase[];

  solvedList: Solved[];

  public static createProblem({
    title,
    description,
    inputFormat,
    constraints,
    sampleInput,
    sampleOutput,
    sampleExplanation,
  }) {
    const problem = new Problem();
    problem.title = title;
    problem.description = description;
    problem.inputFormat = inputFormat;
    problem.constraints = constraints;
    problem.sampleInput = sampleInput;
    problem.sampleOutput = sampleOutput;
    problem.sampleExplanation = sampleExplanation;
    return problem;
  }
}
