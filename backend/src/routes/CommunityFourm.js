import express from "express";
import CategoryController from "../controller/communityFourm/CategoryController.js";
import TopicController from "../controller/communityFourm/TopicsController.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = express.Router();

router.post("/:userId/createCategory", CategoryController);
router.post("/:categoryId/topics",upload.single('file'),TopicController);

export default router;
