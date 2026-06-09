import { Request, Response, NextFunction } from "express";
import {
  getUserNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../services/notification.service";
import { AppError } from "../middlewares/errorHandler";

export async function listNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const notifications = await getUserNotifications(req.user!.id);
    res.json({ status: "success", data: notifications });
  } catch (error) {
    next(error);
  }
}

export async function unreadCount(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const count = await getUnreadCount(_req.user!.id);
    res.json({ status: "success", data: { count } });
  } catch (error) {
    next(error);
  }
}

export async function readNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    if (!id) {
      next(new AppError(400, "Notification id is required"));
      return;
    }
    const notification = await markAsRead(id, req.user!.id);
    res.json({ status: "success", data: notification });
  } catch (error) {
    next(error);
  }
}

export async function readAllNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await markAllAsRead(req.user!.id);
    res.json({ status: "success", message: "All notifications marked as read" });
  } catch (error) {
    next(error);
  }
}

export async function removeNotification(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params.id as string;
    if (!id) {
      next(new AppError(400, "Notification id is required"));
      return;
    }
    await deleteNotification(id, req.user!.id);
    res.json({ status: "success", message: "Notification deleted" });
  } catch (error) {
    next(error);
  }
}
