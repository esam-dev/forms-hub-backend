import { Router } from "express";
import { authenticateJwt } from "../middlewares/authenticateJwt";
import {
  listNotifications,
  unreadCount,
  readNotification,
  readAllNotifications,
  removeNotification,
} from "../controllers/notification.controller";

const router = Router();

router.get("/notifications", authenticateJwt, listNotifications);
router.get("/notifications/unread-count", authenticateJwt, unreadCount);
router.patch("/notifications/:id/read", authenticateJwt, readNotification);
router.patch("/notifications/read-all", authenticateJwt, readAllNotifications);
router.delete("/notifications/:id", authenticateJwt, removeNotification);

export default router;
