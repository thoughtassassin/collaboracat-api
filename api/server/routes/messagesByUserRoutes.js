import { Router } from "express";
import MessageController from "../controllers/MessageController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  MessageController.getMessagesByUser
);

export default router;
