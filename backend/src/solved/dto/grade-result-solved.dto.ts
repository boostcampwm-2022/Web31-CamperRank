export class GradeResultSolvedDto {
  testCaseNumber: number;
  resultCode: number;

  constructor(solvedResult) {
    this.testCaseNumber = solvedResult.testCaseNumber;
    this.resultCode = solvedResult.resultCode;
  }
}
