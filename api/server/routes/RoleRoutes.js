import { Router } from "express";
import RoleController from "../controllers/RoleController";

const router = Router();

router.get("/", RoleController.getAllRoles);
router.post("/", RoleController.addRole);
router.get("/:id", RoleController.getARole);
router.put("/:id", RoleController.updatedRole);
router.delete("/:id", RoleController.deleteRole);

export default router;
