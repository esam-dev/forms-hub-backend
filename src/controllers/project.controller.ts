import { Request, Response, NextFunction } from "express";
import { getUserProjects, createProject, getProjectSubmissions } from "../services/project.service";
import { AppError } from "../middlewares/errorHandler";

export async function listProjects(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const projects = await getUserProjects(req.user!.id);
    res.json({ status: "success", data: projects });
  } catch (error) {
    next(error);
  }
}

export async function addProject(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      next(new AppError(400, "name is required and must be a non-empty string"));
      return;
    }

    const project = await createProject(req.user!.id, name.trim());
    res.status(201).json({ status: "success", data: project });
  } catch (error) {
    next(error);
  }
}

export async function listProjectSubmissions(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const projectId = req.params.projectId as string;

    if (!projectId) {
      next(new AppError(400, "projectId is required"));
      return;
    }

    const submissions = await getProjectSubmissions(projectId, req.user!.id);
    res.json({ status: "success", data: submissions });
  } catch (error) {
    next(error);
  }
}
