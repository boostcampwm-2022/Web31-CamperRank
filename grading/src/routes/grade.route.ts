import { Router } from "express";
import { gradingController, startGrade } from "../controllers/grade.controller";

const router = Router();

router.post("/v1/grading", gradingController);
router.post("/v1/grade", startGrade);

export = router;
