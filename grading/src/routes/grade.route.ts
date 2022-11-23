import { Router } from "express";
import { startGrade } from "../controllers/grade.controller";

const router = Router();

router.post("/v1/grade", startGrade);

export = router;
