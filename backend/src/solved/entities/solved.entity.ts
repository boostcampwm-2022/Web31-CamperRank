import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../../commons/entities/baseTime.entity';
import { Problem } from '../../problem/entities/problem.entity';
import { User } from '../../users/entities/user.entity';
import { ProgrammingLanguage } from './ProgrammingLanguage.enum';
import { SolvedResult } from './SolvedResult.enum';

@Entity()
export class Solved extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Problem, (problem) => problem.solvedList)
  problem: Problem;

  @ManyToOne(() => User, (user) => user.solvedList)
  user: User;

  @Column({
    nullable: false,
    type: 'text',
  })
  userCode: string;

  @Column({
    type: 'enum',
    enum: ProgrammingLanguage,
    default: ProgrammingLanguage.JavaScript,
  })
  language: ProgrammingLanguage;

  @Column({ type: 'enum', enum: SolvedResult, default: SolvedResult.Ready })
  result: SolvedResult;

  public static createSolved({ problem, user, userCode, language, result }) {
    const solved = new Solved();
    solved.problem = problem;
    solved.user = user;
    solved.userCode = userCode;
    solved.language = language;
    solved.result = result;
    return solved;
  }
}
