import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../../commons/entities/baseTime.entity';
import { Problem } from '../../problem/entities/problem.entity';
import { User } from '../../users/entities/user.entity';

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

  public static createSolved({ problem, user, userCode }) {
    const solved = new Solved();
    solved.problem = problem;
    solved.user = user;
    solved.userCode = userCode;
    return solved;
  }
}
