import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../../commons/entities/baseTime.entity';
import { TestCase } from '../../test-case/entities/test-case.entity';
import { Solved } from '../../solved/entities/solved.entity';

@Entity()
export class Problem extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({ nullable: false })
  level: number;

  @Column({
    nullable: false,
    type: 'text',
  })
  description: string;

  testcaseList: TestCase[];

  solvedList: Solved[];

  public static createProblem({ title, level, description }) {
    const problem = new Problem();
    problem.title = title;
    problem.level = level;
    problem.description = description;
    return problem;
  }
}
