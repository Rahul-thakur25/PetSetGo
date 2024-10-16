import express from 'express';
import petController from '../controller/petControllers/PetController.js';
import {upload} from "../middlewares/multer.middleware.js";
import RescueAdoption from '../controller/RescueAndAdoptionController.js';
import updateBreedingStatus from '../controller/petMate/updateBreedingStatusController.js';
import returnPets from '../controller/petControllers/ReturnPetsController.js';


const router = express();
router.post('/:userId/createPets',upload.single('file'),petController);
router.post('/rescueAndAdoption',upload.single('file'),RescueAdoption);
router.put('/:petId/updateBreedingStatus',updateBreedingStatus);
router.get('/:userId/returnPets', returnPets);
export default router;