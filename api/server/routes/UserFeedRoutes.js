import { Router } from "express";
import UserFeedController from "../controllers/UserFeedController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserFeedController.getAllUserFeeds
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserFeedController.addUserFeed
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserFeedController.getAUserFeed
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserFeedController.updatedUserFeed
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserFeedController.deleteUserFeed
);

export default router;
