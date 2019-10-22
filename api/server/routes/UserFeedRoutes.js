import { Router } from "express";
import UserFeedController from "../controllers/UserFeedController";

const router = Router();

router.get("/", UserFeedController.getAllUserFeeds);
router.post("/", UserFeedController.addUserFeed);
router.get("/:id", UserFeedController.getAUserFeed);
router.put("/:id", UserFeedController.updatedUserFeed);
router.delete("/:id", UserFeedController.deleteUserFeed);

export default router;
