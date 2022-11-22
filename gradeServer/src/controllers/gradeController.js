const fs = require('fs');
const { spawnSync } = require('child_process');


exports.startGrade = async function (req, res) {
    //
    try {
        let { userCode, language, input, output } = req.body;
        let filePath = '';
        let codeStyle = '';
        let fileList = [];
        const fileName = Math.floor(Math.random() * 100000000);

        if (language === 'Python') {
            const pythonText = fs.readFileSync(__dirname+'/python.txt', 'utf-8');
            codeStyle = 'python';
            filePath = __dirname +'../../../'+ fileName + '.py';
            userCode = 'import sys \n\n' + userCode +'\n\n' + pythonText;
            fileList.push(filePath);
            

            if (input !== undefined) {
                for (let i = 0; i < input.length; i++) {
                    if (i !== 0) {
                        userCode += ','
                    }
                    userCode += `sys.argv[${i+1}]`
                    fileList.push(input[i]);
                }
            }
            userCode += ')';
            console.log(userCode)

        }
        else if (language === 'JavaScript') {
            codeStyle = 'node';
            filePath = __dirname +'../../../'+ fileName + '.js';
            fileList.push(filePath);
            userCode += '\n\n' + 'solution(';
            if (input !== undefined) {
                for (let i = 1; i < input.length+1; i++) {
                    if (i !== 1) {
                        userCode += ','
                    }
                    userCode += `process.argv[${i+1}]`
                    fileList.push(input[i-1]);
                }
            }
            userCode += ')';
            console.log(userCode)

        }

        fs.writeFileSync(filePath, `${userCode}`, function(err) {
            if (err === null) {
                console.log('success');
            }
            else {
                console.log('fail');
            }
        })
        
        const codeResult = spawnSync(codeStyle, fileList);
        const resultText = codeResult.stdout.toString();
        const errText = codeResult.stderr.toString();
        console.log(resultText)
        console.log(errText)

        fs.unlinkSync(filePath)

        if (errText.length > 0 || errText === null) {
            return res.json({
                isSuccess: false,
                code: 2000,
                message: "채점 실패",
            })
        }
        else {
            return res.json({
                result : resultText,
                isSuccess: true,
                code: 1000,
                message: "채점 성공",
            })
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