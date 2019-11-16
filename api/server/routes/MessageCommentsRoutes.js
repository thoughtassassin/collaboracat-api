import { Router } from "express";
import CommentController from "../controllers/CommentController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.get(
  "/:messageid",
  passport.authenticate("jwt", { session: false }),
  CommentController.getMessageComments
);

export default router;
