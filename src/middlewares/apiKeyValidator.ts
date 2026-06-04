import { Request, Response, NextFunction } from "express";
import prisma from "../services/prisma";
import { AppError } from "./errorHandler";

export async function apiKeyValidator(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const apiKey = req.headers["x-api-key"] as string | undefined;

  if (!apiKey) {
    next(new AppError(401, "Missing API key"));
    return;
  }

  const project = await prisma.project.findUnique({
    where: { apiKey },
  });

  if (!project) {
    next(new AppError(401, "Invalid API key"));
    return;
  }

  req.project = project;
  next();
}
