import express from "express";
import gradeRouter from "./routes/grade.route";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost",
  credentials: true,
};

app.use(cors());
app.use(express.json());
app.use("/", gradeRouter);

app.listen("4000", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 4000🛡️
  ################################################
`);
});
