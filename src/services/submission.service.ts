import prisma from "./prisma";
import type { Prisma } from "@prisma/client";

export async function createSubmission(
  projectId: string,
  formName: string,
  payload: Prisma.InputJsonValue,
) {
  return prisma.formSubmission.create({
    data: {
      formName,
      payload,
      projectId,
    },
    select: {
      id: true,
      formName: true,
      payload: true,
      createdAt: true,
    },
  });
}
