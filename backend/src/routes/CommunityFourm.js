import express from "express";
import CategoryController from "../controller/communityFourm/CategoryController.js";
import TopicController from "../controller/communityFourm/TopicsController.js";
import replyController from "../controller/communityFourm/ReplyController.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = express.Router();

router.post("/:userId/createCategory", CategoryController);
router.post("/:categoryId/topics",upload.single('file'),TopicController);
router.post("/:userId/:topicId/reply", replyController )

export default router;