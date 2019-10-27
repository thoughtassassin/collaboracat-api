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
router.post("/", RoleController.addRole);
router.get("/:id", RoleController.getARole);
router.put("/:id", RoleController.updatedRole);
router.delete("/:id", RoleController.deleteRole);

export default router;
