const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');

module.exports = function () {
    const app = express();

    // 미들웨어 압축, 파일 용량 줄임
    app.use(compression());

    app.use(express.json());

    // restful api 중 put, delete를 사용하기 위해 씀
    app.use(methodOverride());

    // urlencoded 페이로드로 들어오는 요청을 분석, extended true는 qs 모듈을 써서 body parsing
    app.use(express.urlencoded({extended: true}));

    // 모든 도메인에서 나의 서버에게 요청을 보낼 수 있게 해줌
    app.use(cors());

    require('../src/routes/gradeRoute')(app);
    return app;
};