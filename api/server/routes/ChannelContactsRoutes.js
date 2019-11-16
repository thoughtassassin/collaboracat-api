import { Router } from "express";
import ContactController from "../controllers/ContactController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.get(
  "/:channelid",
  passport.authenticate("jwt", { session: false }),
  ContactController.getChannelContacts
);

export default router;
