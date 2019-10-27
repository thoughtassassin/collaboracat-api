import { Router } from "express";
import ChannelController from "../controllers/ChannelController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  ChannelController.getAllChannels
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ChannelController.addChannel
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ChannelController.getAChannel
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ChannelController.updatedChannel
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ChannelController.deleteChannel
);

export default router;
