const fs = require('fs');
const { spawnSync } = require('child_process');


exports.startGrade = async function (req, res) {
    //
    try {
        let { userCode, language, input, output } = req.body;
        let filePath = '';
        const fileName = Math.floor(Math.random() * 100000000);
        if (language === 'Python') {
            const pythonText = fs.readFileSync(__dirname+'/python.txt', 'utf-8');
            filePath = __dirname +'../../../'+ fileName + '.py';
            userCode = 'import sys \n\n' + userCode +'\n\n' + pythonText;
            

            if (input !== undefined) {
                for (let i = 0; i < input.length; i++) {
                    if (i !== 0) {
                        userCode += ','
                    }
                    userCode += `sys.argv[${i+1}]`
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
        const pythonResult = spawnSync('python', [`${filePath}`,'1','2']);
        const resultText = pythonResult.stdout.toString();
        const errText = pythonResult.stderr.toString();

        fs.unlinkSync(filePath)

        if (errText.length > 0) {
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