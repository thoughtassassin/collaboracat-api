import { Router } from "express";
import RequestChannelController from "../controllers/RequestChannelController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  RequestChannelController.requestChannel
);

export default router;
