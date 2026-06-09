import prisma from "./prisma";
import { AppError } from "../middlewares/errorHandler";

export async function getUserNotifications(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUnreadCount(userId: string) {
  return prisma.notification.count({
    where: { userId, read: false },
  });
}

export async function markAsRead(notificationId: string, userId: string) {
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
    select: { userId: true },
  });
  if (!notification) throw new AppError(404, "Notification not found");
  if (notification.userId !== userId) throw new AppError(403, "Access denied");

  return prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  });
}

export async function markAllAsRead(userId: string) {
  await prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  });
}

export async function deleteNotification(notificationId: string, userId: string) {
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
    select: { userId: true },
  });
  if (!notification) throw new AppError(404, "Notification not found");
  if (notification.userId !== userId) throw new AppError(403, "Access denied");

  await prisma.notification.delete({ where: { id: notificationId } });
}

export async function createNotification(
  userId: string,
  title: string,
  message: string,
  type: string = "info",
) {
  return prisma.notification.create({
    data: { userId, title, message, type },
  });
}
