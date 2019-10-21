import { Router } from "express";
import FeedController from "../controllers/FeedController";

const router = Router();

router.get("/", FeedController.getAllFeeds);
router.post("/", FeedController.addFeed);
router.get("/:id", FeedController.getAFeed);
router.put("/:id", FeedController.updatedFeed);
router.delete("/:id", FeedController.deleteFeed);

export default router;
