import express from 'express';
import petController from '../controller/petControllers/PetController.js';
import {upload} from "../middlewares/multer.middleware.js";
import RescueAdoption from '../controller/RescueAndAdoptionController.js';

const router = express();
router.post('/:userId/createPets',upload.single('file'),petController);
router.post('/rescueAndAdoption',upload.single('file'),RescueAdoption);

export default router;