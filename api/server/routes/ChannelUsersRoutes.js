import { Router } from "express";
import ChannelUserController from "../controllers/ChannelUserController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.get(
  "/:channelid",
  passport.authenticate("jwt", { session: false }),
  ChannelUserController.getChannelUsers
);

export default router;
