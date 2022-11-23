import { spawnSync } from "child_process";
import { v4 as uuid } from "uuid";

import fs from "fs";

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

// function buildCode(userCode: string, testCaseInput: any[], cmd: string) {
//   if (cmd === "python") {
//     const totalCode =
//       "import sys" + "\n\n" + userCode + "\n\n" + "if __name__ == '__main__':";
//     let argsStr = "    solution(";
//     for (let i = 0; i < testCaseInput.length; i++) {
//       if (i !== 0) {
//         argsStr += ",";
//       }
//       argsStr += `sys.argv[${i + 1}]`;
//     }
//   } else if (cmd === "node") {
//   }
// }

export const startGrade = async (req: any, res: any) => {
  try {
    // const codeText = req.body.code;
    const userCode = req.body.data.userCode;
    console.log(userCode);
    console.log(req.body.data);
    const fileName = uuid();
    const plClassifier = PLClassifier(req.body.data.language);
    const filePath =
      "C:\\Users\\SeHyun\\Code\\boostcamp_Membership\\CamperRank\\tempCodes\\" +
      fileName +
      plClassifier.ext;

    fs.writeFileSync(filePath, `${userCode}`);
    const pythonResult = spawnSync(plClassifier.cmd, [`${filePath}`], {});
    console.log(pythonResult);
    const resultText = pythonResult.stdout.toString();
    const errText = pythonResult.stderr.toString();
    fs.unlinkSync(filePath);

    if (errText.length === 0 && req.body.data.testCaseOutput === resultText) {
      res.status(200).json({
        solvedId: req.body.data.solvedId,
        result: "success",
        msg: "정답",
      });
    } else {
      res.status(200).json({
        solvedId: req.body.data.solvedId,
        result: "fail",
        msg: "오답",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      solvedId: req.body.data.solvedId,
      result: "fail",
      msg: "채점 실패",
    });
  }
};
