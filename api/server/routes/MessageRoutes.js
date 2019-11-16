import { Router } from "express";
import MessageController from "../controllers/MessageController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  MessageController.getAllMessages
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  MessageController.addMessage
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  MessageController.getAMessage
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  MessageController.updatedMessage
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  MessageController.deleteMessage
);

export default router;
