import { atom } from "recoil";

type Result ={
  testCaseNumber?: string,
  resultCode?: number,
  userAnswer?: string,
  userPring?: string,
}

interface Grading {
  status: string;
  result: Result[];
  kind?: string;
}

export const gradingState = atom<Grading>({
  key: "gradingState",
  default: {
    status: 'ready',
    result: []
  },
});
