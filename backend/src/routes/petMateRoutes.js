import express from 'express';
import listAllPet from "../controller/petMate/listAllPets.js"
import BreedingController from '../controller/petMate/BreedingController.js';

const router = express();

router.get('/:userId/getPetMates',listAllPet);
router.post('/:reqPetId/requestBreeding/:resPetId', BreedingController); // Define the route for breeding request

export default router;