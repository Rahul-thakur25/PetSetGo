import express from 'express';
import petController from '../controller/petControllers/PetController.js';
import {upload} from "../middlewares/multer.middleware.js";
import RescueAdoption from '../controller/RescueAndAdoptionController.js';
import updateBreedingStatus from '../controller/petMate/updateBreedingStatusController.js';
import returnPets from '../controller/petControllers/ReturnPetsController.js';
import updatePet from '../controller/petControllers/updatePetController.js';


const router = express();
router.post('/:userId/createPets',upload.single('file'),petController);
router.post('/rescueAndAdoption',upload.single('file'),RescueAdoption);
router.put('/:petId/updateBreedingStatus',updateBreedingStatus);
router.put('/:petId/updatePet',upload.single('file'),updatePet);
router.get('/:userId/returnPets', returnPets);

export default router;