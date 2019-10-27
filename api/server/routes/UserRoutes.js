import { Router } from "express";
import UserController from "../controllers/UserController";
import passport from "passport";
import "../src/config/passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserController.getAllUsers
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserController.addUser
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.getAUser
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.updatedUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.deleteUser
);

export default router;
