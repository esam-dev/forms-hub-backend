import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import submissionRoutes from "./submission.routes";

const router = Router();

router.use(healthRoutes);
router.use(authRoutes);
router.use(submissionRoutes);

export default router;
