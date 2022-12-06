import express from "express";
import gradeRouter from "./routes/grade.route";
import cors from "cors";
import compression from "compression";
import methodOverride from "method-override";
import https from "https";
import fs from "fs";
import * as http from "http";

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors());

// 미들웨어 압축, 파일 용량 줄임
app.use(compression());
// restful api 중 put, delete를 사용하기 위해 씀
app.use(methodOverride());

// urlencoded 페이로드로 들어오는 요청을 분석, extended true는 qs 모듈을 써서 body parsing
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/grade-server", gradeRouter);

const httpsOptions = {
  ca: fs.readFileSync(process.env.HTTPS_FULLCHAIN || ""),
  key: fs.readFileSync(process.env.HTTPS_PRIVATE_KEY || ""),
  cert: fs.readFileSync(process.env.HTTPS_PUBLIC_CERTIFICATE || ""),
};

https.createServer(httpsOptions, app).listen(4000);
http.createServer(app).listen(4080);
