declare module "@types" {
  interface ProblemInfo {
    level: number;
    title: string;
    description: string;
  }

  type ProblemType = {
    problem: ProblemInfo;
  };
}
