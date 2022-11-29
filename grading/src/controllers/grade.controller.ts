import { spawnSync, execSync } from "child_process";
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
  // const totalCode = userCode + "\n\n" + "console.log(answer)";
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
    const { solvedId, language, userCode, testCaseInput, testCaseOutput } =
      req.body.data;
    const fileName = uuid();
    const plClassifier = PLClassifier(language);
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

    if (errText.length === 0 && testCaseOutput === userAnswer) {
      res.status(200).json({
        solvedId: solvedId,
        result: "success",
        userPrint: userPrint,
        userAnswer: userAnswer,
        resultCode: 1000,
        msg: "정답",
      });
    } else {
      res.status(200).json({
        solvedId: solvedId,
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
    console.log("data", req.body.data);
    let {
      solvedId,
      problemId,
      userCode,
      language,
      testCaseInput,
      testCaseOutput,
    } = req.body.data;
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

      if (testCaseInput !== undefined) {
        for (let i = 0; i < testCaseInput.length; i++) {
          if (i !== 0) {
            userCode += ",";
          }
          userCode += `sys.argv[${i + 1}]`;
          fileList.push(testCaseInput[i]);
        }
      }
      userCode += ")\nprint('##########')\nprint(answer)";
    } else if (language === "JavaScript") {
      codeStyle = "node";
      filePath = __dirname + "../../../" + fileName + ".js";
      fileList.push(filePath);
      userCode += "\n\n" + "let answer = solution(";
      if (testCaseInput !== undefined) {
        for (let i = 1; i < testCaseInput.length + 1; i++) {
          if (i !== 1) {
            userCode += ",";
          }
          userCode += `process.argv[${i + 1}]`;
          fileList.push(testCaseInput[i - 1]);
        }
      }
      userCode += ")\n\tconsole.log('##########')\n\tconsole.log(answer)";
    }
    console.log(userCode);

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
        solvedId: solvedId,
        result: "fail",
        resultCode: 2000,
        msg: "채점 실패",
      });
    } else {
      if (answerText == testCaseOutput) {
        return res.json({
          solvedId: solvedId,
          result: "success",
          userPrint: solutionText,
          userAnswer: answerText,
          resultCode: 1000,
          msg: "정답",
        });
      } else {
        return res.json({
          solvedId: req.body.data.solvedId,
          result: "fail",
          userPrint: solutionText,
          userAnswer: answerText,
          resultCode: 1001,
          msg: "오답",
        });
      }
    }
  } catch (err) {
    console.log(err);
    console.log(`Api - grade problem error\n: ${JSON.stringify(err)}`);

    return res.json({
      solvedId: req.body.data.solvedId,
      result: "fail",
      resultCode: 2000,
      msg: "채점 실패",
    });
  }
};


export const startDocker = async function (req: any, res: any) {
  try {
    let { problemId, userCode, language, input, output } = req.body;

    problemId = problemId || "undefined";

    const fileName = Math.floor(Math.random() * 100000000);
    let filePath = __dirname + "/../../" + fileName + ".py";
    console.log(__dirname)
    userCode = `print('${fileName}')`

    // const CMD1 = `cd src/controllers/demo &&
    //               docker build -t demo .`;
    // const CMD2 = `docker run --rm demo`
    // const CMD3 = `docker image prune -a -f`

    // execSync(CMD1);
    // let result = execSync(CMD2);
    // execSync(CMD3);

    fs.writeFileSync(filePath, `${userCode}`);

    const CMD4 = `docker run --rm -v $(pwd)/${fileName}.py:/home/test.py demo`;
    let result:any = execSync(CMD4);

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
