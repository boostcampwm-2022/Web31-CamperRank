import { Problem } from '../entities/problem.entity';

export class SimpleProblemDto {
  title: string;
  level: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(problem: Problem) {
    this.title = problem.title;
    this.level = problem.level;
    this.description = problem.description;
    this.createdAt = problem.createdAt;
    this.updatedAt = problem.updatedAt;
  }
}
