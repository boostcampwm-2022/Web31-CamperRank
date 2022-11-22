const fs = require('fs');
const { spawnSync } = require('child_process');


exports.startGrade = async function (req, res) {
    //
    try {
        const codeText = req.body.code;
        const fileName = Math.floor(Math.random() * 100000000);
        const filePath = __dirname +'../../../'+ fileName + '.py';

        fs.writeFileSync(filePath, `${codeText}`, function(err) {
            if (err === null) {
                console.log('success');
            }
            else {
                console.log('fail');
            }
        })
        const pythonResult = spawnSync('python', [`${filePath}`]);
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