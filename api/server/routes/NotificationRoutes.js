import { Router } from "express";
import NotificationController from "../controllers/NotificationController";
import passport from "passport";
import "../src/config/passport";
const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  NotificationController.getAllNotifications
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  NotificationController.addNotification
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  NotificationController.getANotification
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  NotificationController.updatedNotification
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  NotificationController.deleteNotification
);
router.get(
  "/admin/:userId",
  passport.authenticate("jwt", { session: false }),
  NotificationController.getAdminNotifications
);
router.get(
  "/user/:userId",
  passport.authenticate("jwt", { session: false }),
  NotificationController.getUserNotifications
);
router.post(
  "/set-all/:userId",
  passport.authenticate("jwt", { session: false }),
  NotificationController.setAllUserNotifications
);

export default router;
