import { Router } from "express";
import FeedController from "../controllers/FeedController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  FeedController.getAllFeeds
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  FeedController.addFeed
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  FeedController.getAFeed
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  FeedController.updatedFeed
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  FeedController.deleteFeed
);

export default router;
