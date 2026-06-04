import { Router } from "express";
import { apiKeyValidator } from "../middlewares/apiKeyValidator";
import { createSubmissionController } from "../controllers/submission.controller";

const router = Router();

router.post("/submissions", apiKeyValidator, createSubmissionController);

export default router;
