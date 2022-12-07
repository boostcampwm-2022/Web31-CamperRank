import { atom } from 'recoil';

type TestCase = {
  testCaseNumber?: string;
  userPrint?: string;
  resultCode?: number;
  userAnswer?: string;
};

type Result = {
  [key: number]: TestCase;
  statusCode?: number;
  solvedId?: number;
  solvedResult?: string;
};

interface Grading {
  status: string;
  result?: Result;
  kind?: string;
}

export const gradingState = atom<Grading>({
  key: 'gradingState',
  default: {
    status: 'ready',
  },
});
