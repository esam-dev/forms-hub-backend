import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/errorHandler";
import { createSubmission } from "../services/submission.service";

export async function createSubmissionController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { formName, payload } = req.body;

    if (!formName || typeof formName !== "string" || formName.trim().length === 0) {
      next(new AppError(400, "formName is required and must be a non-empty string"));
      return;
    }

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      next(new AppError(400, "payload is required and must be a valid JSON object"));
      return;
    }

    const project = req.project!;

    const submission = await createSubmission(project.id, formName.trim(), payload);

    res.status(201).json({
      status: "success",
      data: submission,
    });
  } catch (error) {
    next(error);
  }
}
