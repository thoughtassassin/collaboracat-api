import { Router } from "express";
import ResetPasswordController from "../controllers/ResetPasswordController";
const router = Router();

router.post("/", ResetPasswordController.request);
router.post("/:email/:token", ResetPasswordController.reset);

export default router;
