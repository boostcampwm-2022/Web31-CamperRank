declare module "@types" {
  interface ProblemInfo {
    level?: number;
    title: string;
    description: string;
    id?: number;
  }

  type ProblemType = {
    problem: ProblemInfo;
  };
}
