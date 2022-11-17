import { Solved } from '../entities/solved.entity';

export class SimpleSolvedDto {
  problemId: number;
  userId: number;
  userCode: string;

  constructor(solved: Solved) {
    this.problemId = solved.problem.id;
    this.userId = solved.user.id;
    this.userCode = solved.userCode;
  }
}
