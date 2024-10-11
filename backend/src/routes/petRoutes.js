import express from 'express';
import petController from '../controller/petControllers/PetController.js';
import {upload} from "../middlewares/multer.middleware.js"

const router = express();
router.post('/createPets',upload.single('file'),petController);

export default router;