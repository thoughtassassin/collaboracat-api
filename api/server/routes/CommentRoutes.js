import { Router } from "express";
import CommentController from "../controllers/CommentController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  CommentController.getAllComments
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  CommentController.addComment
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  CommentController.getAComment
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  CommentController.updatedComment
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  CommentController.deleteComment
);

export default router;
