import express from 'express';
import listAllPet from "../controller/petMate/listAllPets.js"
import BreedingController from '../controller/petMate/BreedingController.js';
import matchController from '../controller/petMate/MatchController.js';
import getPendingRequest from "../controller/petMate/PendingReq.js"

const router = express();


router.post('/:reqPetId/requestBreeding/:resPetId', BreedingController); // Define the route for breeding request
router.post('/:breedingStatusId/matchPets', matchController); // Define the route for matching pets
router.get('/:userId/pendingRequest', getPendingRequest); // Define the route for getting pending requests for a user

router.get('/:userId/getPetMates',listAllPet);
export default router;