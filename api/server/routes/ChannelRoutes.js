import { Router } from "express";
import ChannelController from "../controllers/ChannelController";

const router = Router();

router.get("/", ChannelController.getAllChannels);
router.post("/", ChannelController.addChannel);
router.get("/:id", ChannelController.getAChannel);
router.put("/:id", ChannelController.updatedChannel);
router.delete("/:id", ChannelController.deleteChannel);

export default router;
