import { Router } from "express";
import ProviderController from "../controllers/ProviderController";
import passport from "passport";
import "../src/config/passport";
const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  ProviderController.getAllProviders
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ProviderController.addProvider
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ProviderController.getAProvider
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ProviderController.updatedProvider
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ProviderController.deleteProvider
);

export default router;
