declare module "@types" {
  interface ProblemInfo {
    level: number;
    title: string;
    description: string;
    problemId: number;
    createdAt: string;
    updatedAt: string;
    isSolved: boolean;
  }

  type ProblemType = {
    problem: ProblemInfo;
  };
}
