import { Router } from "express";
import { gradingController, startDocker, startGrade } from "../controllers/grade.controller";

const router = Router();

router.post("/v1/grading", gradingController);
router.post("/v1/grade", startGrade);
router.post("/v1/docker", startDocker);

export = router;
