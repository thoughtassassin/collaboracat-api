import { Router } from "express";
import WarehouseController from "../controllers/WarehouseController";
import passport from "passport";
import "../src/config/passport";
const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  WarehouseController.getAllWarehouses
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  WarehouseController.addWarehouse
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  WarehouseController.getAWarehouse
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  WarehouseController.updatedWarehouse
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  WarehouseController.deleteWarehouse
);

export default router;
