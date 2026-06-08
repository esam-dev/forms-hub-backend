import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import submissionRoutes from "./submission.routes";
import projectRoutes from "./project.routes";

const router = Router();
router.use(healthRoutes);
router.use(authRoutes);
router.use(submissionRoutes);
router.use(projectRoutes);

export default router;
