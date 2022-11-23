import express from "express";
import gradeRouter from "./routes/grade.route";
import cors from "cors";
import compression from "compression";
import methodOverride from "method-override";

const app = express();

const corsOptions = {
  origin: "http://localhost",
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
app.use("/", gradeRouter);

app.listen("4000", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 4000🛡️
  ################################################
`);
});
