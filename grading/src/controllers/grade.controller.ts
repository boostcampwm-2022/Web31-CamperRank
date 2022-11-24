import { spawnSync } from "child_process";
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

function parserNode(userCode: string, testCaseInput: any[]) {}

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
    const testCaseInput = req.body.data.testCaseInput;
    const userCode = req.body.data.userCode;
    const fileName = uuid();
    const plClassifier = PLClassifier(req.body.data.language);
    const filePath = process.env.NEW_FILE_PATH + fileName + plClassifier.ext;
    const totalCode = buildCode(userCode, testCaseInput, plClassifier.cmd);

    fs.writeFileSync(filePath, `${totalCode}`);
    const pythonResult = spawnSync(
      plClassifier.cmd,
      [`${filePath}`, testCaseInput],
      {
        maxBuffer: 1024 * 1024,
        timeout: 10000,
      }
    );
    const resultText = pythonResult.stdout.toString();
    const errText = pythonResult.stderr.toString();
    fs.unlinkSync(filePath);

    const strings = resultText.split(IDENTIFY_CODE);
    const userPrint = strings[0].replace(/\\r\\n/gi, "\n");
    const userAnswer = strings[1].trim();
    console.log(errText);

    if (errText.length === 0 && req.body.data.testCaseOutput === userAnswer) {
      res.status(200).json({
        solvedId: req.body.data.solvedId,
        result: "success",
        userPrint: userPrint,
        userAnswer: userAnswer,
        resultCode: 1000,
        msg: "정답",
      });
    } else {
      res.status(200).json({
        solvedId: req.body.data.solvedId,
        result: "fail",
        userPrint: userPrint,
        userAnswer: userAnswer,
        resultCode: 1001,
        msg: "오답",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      solvedId: req.body.data.solvedId,
      result: "fail",
      resultCode: 2000,
      msg: "채점 실패",
    });
  }
};

export const startGrade = async function (req: any, res: any) {
  try {
    let { problemId, userCode, language, input, output } = req.body.data;
    let filePath = "";
    let codeStyle = "";
    let fileList = [];
    const fileName = Math.floor(Math.random() * 100000000);

    problemId = problemId || "undefined";

    if (language === "Python") {
      const pythonText = fs.readFileSync(__dirname + "/python.txt", "utf-8");
      codeStyle = "python";
      filePath = __dirname + "../../../" + fileName + ".py";
      userCode = "import sys \n\n" + userCode + "\n\n" + pythonText;
      fileList.push(filePath);

      if (input !== undefined) {
        for (let i = 0; i < input.length; i++) {
          if (i !== 0) {
            userCode += ",";
          }
          userCode += `sys.argv[${i + 1}]`;
          fileList.push(input[i]);
        }
      }
      userCode += ")\nprint('##########')\nprint(answer)";
      console.log(userCode);
    } else if (language === "JavaScript") {
      codeStyle = "node";
      filePath = __dirname + "../../../" + fileName + ".js";
      fileList.push(filePath);
      userCode += "\n\n" + "let answer = solution(";
      if (input !== undefined) {
        for (let i = 1; i < input.length + 1; i++) {
          if (i !== 1) {
            userCode += ",";
          }
          userCode += `process.argv[${i + 1}]`;
          fileList.push(input[i - 1]);
        }
      }
      userCode += ")\n\tconsole.log('##########')\n\tconsole.log(answer)";
      console.log(userCode);
    }

    fs.writeFileSync(filePath, `${userCode}`);

    const codeResult = spawnSync(codeStyle, fileList, {
      maxBuffer: 1000,
      /* timeout 3s */
      timeout: 3000,
    });
    const resultText = codeResult.stdout.toString();
    const errText = codeResult.stderr.toString();
    let solutionText = "";
    let answerText = "";
    if (resultText.split("##########\n").length < 2) {
      solutionText = "";
      answerText = resultText.split("##########\n")[0];
    } else {
      solutionText = resultText.split("##########\n")[0];
      answerText = resultText.split("##########\n")[1] || "";
    }

    fs.unlinkSync(filePath);

    if (errText.length > 0 || errText === null) {
      return res.json({
        isSuccess: false,
        code: 2000,
        message: "코드 실행 실패",
      });
    } else {
      if (answerText == output) {
        return res.json({
          problemId: problemId,
          solutionText: solutionText,
          answerText: answerText,
          isSuccess: true,
          code: 1000,
          message: "정답 맞추기 성공",
        });
      } else {
        return res.json({
          problemId: problemId,
          solutionText: solutionText,
          answerText: answerText,
          isSuccess: true,
          code: 1000,
          message: "정답 맞추기 실패",
        });
      }
    }
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
