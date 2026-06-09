import prisma from "./prisma";
import type { Prisma } from "@prisma/client";
import { createNotification } from "./notification.service";

export async function createSubmission(
  projectId: string,
  formName: string,
  payload: Prisma.InputJsonValue,
) {
  const submission = await prisma.formSubmission.create({
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
      project: {
        select: {
          userId: true,
          name: true,
        },
      },
    },
  });

  await createNotification(
    submission.project.userId,
    "Nuevo formulario recibido",
    `Se recibió un nuevo envío del formulario "${submission.formName}" en el proyecto "${submission.project.name}".`,
    "submission_received",
  );

  const { project: _, ...result } = submission;
  return result;
}
