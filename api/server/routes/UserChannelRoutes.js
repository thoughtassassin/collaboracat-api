import { Router } from "express";
import UserChannelController from "../controllers/UserChannelController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserChannelController.getAllUserChannels
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserChannelController.addUserChannel
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserChannelController.getAUserChannel
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserChannelController.updatedUserChannel
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserChannelController.deleteUserChannel
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserChannelController.removeUserChannel
);

export default router;
