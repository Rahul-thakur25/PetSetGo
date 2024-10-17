import express from "express";
import CategoryController from "../controller/communityFourm/CategoryController.js";
import TopicController from "../controller/communityFourm/TopicsController.js";
import replyController from "../controller/communityFourm/ReplyController.js";
import getCategory from "../controller/communityFourm/getCategory.js";
import getTopics from "../controller/communityFourm/getTopics.js";
import {upload} from "../middlewares/multer.middleware.js"
const router = express.Router();
router.post("/:userId/createCategory",upload.single('file'), CategoryController);
router.post("/:userId/:categoryId/topics",upload.single('file'),TopicController);
router.post("/:userId/:topicId/reply", replyController);
router.get("/:userId/categories", getCategory);
router.get("/:userId/:categoryId/topics", getTopics);
export default router;