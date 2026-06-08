import crypto from "crypto";
import prisma from "./prisma";
import { AppError } from "../middlewares/errorHandler";

export async function getUserProjects(userId: string) {
  return prisma.project.findMany({
    where: { userId },
    select: { id: true, name: true, apiKey: true, createdAt: true, updatedAt: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createProject(userId: string, name: string) {
  const apiKey = `fhk_${crypto.randomBytes(32).toString("hex")}`;

  return prisma.project.create({
    data: { name, apiKey, userId },
    select: { id: true, name: true, apiKey: true, createdAt: true },
  });
}

export async function getProjectSubmissions(projectId: string, userId: string) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { userId: true },
  });

  if (!project) throw new AppError(404, "Project not found");
  if (project.userId !== userId) throw new AppError(403, "Access denied");

  return prisma.formSubmission.findMany({
    where: { projectId },
    select: { id: true, formName: true, payload: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
}
