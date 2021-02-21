import { Router } from "express";
import PDFReportController from "../controllers/PDFReportController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.post(
  "/users/:userid",
  passport.authenticate("jwt", { session: false }),
  PDFReportController.getUserReport
);

router.post(
  "/channels/:channelid",
  passport.authenticate("jwt", { session: false }),
  PDFReportController.getChannelReport
);

export default router;
