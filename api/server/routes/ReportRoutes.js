import { Router } from "express";
import ReportController from "../controllers/ReportController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.post(
  "/users/:userid",
  passport.authenticate("jwt", { session: false }),
  ReportController.getUserReport
);

router.post(
  "/channels/:channelid",
  passport.authenticate("jwt", { session: false }),
  ReportController.getChannelReport
);

export default router;
