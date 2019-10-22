import { Router } from "express";
import UserChannelController from "../controllers/UserChannelController";

const router = Router();

router.get("/", UserChannelController.getAllUserChannels);
router.post("/", UserChannelController.addUserChannel);
router.get("/:id", UserChannelController.getAUserChannel);
router.put("/:id", UserChannelController.updatedUserChannel);
router.delete("/:id", UserChannelController.deleteUserChannel);

export default router;
