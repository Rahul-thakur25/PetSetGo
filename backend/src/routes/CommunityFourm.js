import express from "express";
import CategoryController from "../controller/communityFourm/CategoryController.js";

const router = express.Router();

router.post("/:userId/createCategory", CategoryController);

export default router;
