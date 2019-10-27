import { Router } from "express";
import RoleController from "../controllers/RoleController";
import passport from "passport";
import "../src/config/passport";
const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  RoleController.getAllRoles
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  RoleController.addRole
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  RoleController.getARole
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  RoleController.updatedRole
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  RoleController.deleteRole
);

export default router;
