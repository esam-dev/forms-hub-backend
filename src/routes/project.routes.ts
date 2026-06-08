import { Router } from "express";
import { authenticateJwt } from "../middlewares/authenticateJwt";
import { listProjects, addProject, listProjectSubmissions } from "../controllers/project.controller";

const router = Router();

router.get("/projects", authenticateJwt, listProjects);
router.post("/projects", authenticateJwt, addProject);
router.get("/projects/:projectId/submissions", authenticateJwt, listProjectSubmissions);

export default router;
