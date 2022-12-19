import { execSync, spawnSync } from "child_process";
import { v4 as uuid } from "uuid";
import fs from "fs";

const IDENTIFY_CODE = process.env.IDENTIFY_CODE || "secret";

function PLClassifier(pl: string) {
  switch (pl) {
    case "Python":
      return { cmd: "python", ext: ".py" };
    case "JavaScript":
      return { cmd: "node", ext: ".js" };
    default:
      return { cmd: "", ext: "" };
  }
}

function parserPython(userCode: string, testCaseInput: any[]) {
  const totalCode =
    "import sys" +
    "\n\n" +
    userCode +
    "\n\n" +
    "if __name__ == '__main__':\n\t";
  const argsArr = [];
  const varArr = [];
  for (let i = 0; i < testCaseInput.length; i++) {
    varArr.push(
      `argv${i + 1} = ${
        testCaseInput[i].length > 1
          ? "[" + testCaseInput[i] + "]"
          : testCaseInput[i]
      }`
    );
    argsArr.push(`argv${i + 1}`);
  }
  const argsStr = argsArr.join(",");
  const varStr = varArr.join("\n\t");
  return (
    totalCode +
    varStr +
    "\n\tanswer = solution(" +
    argsStr +
    `)\n\tprint('${IDENTIFY_CODE}')\n\tprint(answer)`
  );
}

function parserNode(userCode: string, testCaseInput: any[]) {
  const argsArr = [];
  const varArr = [];
  for (let i = 0; i < testCaseInput.length; i++) {
    varArr.push(
      `\nlet argv${i + 1} = ${
        testCaseInput[i].length > 1
          ? "[" + testCaseInput[i] + "]"
          : testCaseInput[i]
      }`
    );
    argsArr.push(`argv${i + 1}`);
  }
  const argsStr = argsArr.join(",");
  const varStr = varArr.join("\n\t");
  return (
    userCode +
    varStr +
    "\nconst answer = solution(" +
    argsStr +
    `)\nconsole.log('${IDENTIFY_CODE}')\nconsole.log(answer)`
  );
}

function buildCode(userCode: string, testCaseInput: any[], cmd: string) {
  switch (cmd) {
    case "python":
      return parserPython(userCode, testCaseInput);
    case "node":
      return parserNode(userCode, testCaseInput);
    default:
      throw Error();
  }
}

export const gradingController = async (req: any, res: any) => {
  try {
    let {
      solvedId,
      language,
      userCode,
      testCaseNumber,
      testCaseInput,
      testCaseOutput,
    } = req.body;

    const fileName = uuid();
    const plClassifier = PLClassifier(language);
    const filePath = "./" + fileName + plClassifier.ext;
    const totalCode = buildCode(userCode, testCaseInput, plClassifier.cmd);

    fs.writeFileSync(filePath, `${totalCode}`);
    const spawnResult = spawnSync(
      plClassifier.cmd,
      [`${filePath}`, testCaseInput],
      {
        maxBuffer: 1024 * 1024,
        timeout: 10000,
        // uid: 1001,
      }
    );

    const {stdout, stderr, status, signal, error} = spawnResult;
    fs.unlinkSync(filePath);

    // signal에 대한 처리 필요

    const strings = stdout.toString().split(IDENTIFY_CODE);
    const userPrint = strings[0].replace(/\\r\\n/gi, "\n");
    const userAnswer = strings[1].trim();

    if (
      stderr.toString().length === 0 &&
      JSON.stringify(testCaseOutput) === JSON.stringify(JSON.parse(userAnswer))
    ) {
      res.status(200).json({
        solvedId: solvedId,
        testCaseNumber: testCaseNumber,
        userPrint: userPrint,
        userAnswer: userAnswer,
        resultCode: 1000,
      });
    } else {
      res.status(200).json({
        solvedId: solvedId,
        testCaseNumber: testCaseNumber,
        userPrint: userPrint,
        userAnswer: userAnswer,
        resultCode: 1001,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      solvedId: req.body.solvedId,
      testCaseNumber: req.body.testCaseNumber,
      resultCode: 2000,
    });
  }
};


export const startDocker = async function (req: any, res: any) {
  try {
    let {
      solvedId,
      problemId,
      userCode,
      language,
      testCaseInput,
      testCaseOutput,
    } = req.body;

    problemId = problemId || "undefined";

    const fileName = Math.floor(Math.random() * 100000000);
    let filePath = __dirname + "/../../" + fileName + ".py";
    console.log(__dirname);
    userCode = `print('${fileName}')`;

    // const CMD1 = `cd src/controllers/demo &&
    //               docker build -t demo .`;
    // const CMD2 = `docker run --rm demo`
    // const CMD3 = `docker image prune -a -f`

    // execSync(CMD1);
    // let result = execSync(CMD2);
    // execSync(CMD3);

    fs.writeFileSync(filePath, `${userCode}`);

    const CMD4 = `docker run --rm -v $(pwd)/${fileName}.py:/home/test.py demo`;
    let result: any = execSync(CMD4);

    fs.unlinkSync(filePath);

    let resultText = result.toString();

    console.log(resultText);

    return res.json({
      result: resultText,
      isSuccess: true,
      code: 2000,
      message: "채점 성공",
    });
  } catch (err) {
    console.log(err);
    console.log(`Api - grade problem error\n: ${JSON.stringify(err)}`);

    return res.json({
      isSuccess: false,
      code: 2000,
      message: "채점 실패",
    });
  }
};
