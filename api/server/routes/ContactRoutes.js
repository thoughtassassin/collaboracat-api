import { Router } from "express";
import ContactController from "../controllers/ContactController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  ContactController.getAllContacts
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ContactController.addContact
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ContactController.getAContact
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ContactController.updatedContact
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ContactController.deleteContact
);

export default router;
