import zod from 'zod';
import Breeding from '../../models/petMate/BreedingSchema.js';
import matched from "../../models/petMate/matchedSchema.js";
import user from "../../models/User/UserSchema.js"
import { response } from 'express';

// Define Zod schemas for validation
const idSchema = zod.string();
const statusSchema = zod.enum(['Accept', 'Reject']);

const matchController = async (req, res) => {
    const { breedingStatusId } = req.params; // ID of the breeding status to update
    const { status } = req.body; // Status to be updated

    // Validate the status and breeding status ID
    const statusValidation = statusSchema.safeParse(status); 
    const breedingIdValidation = idSchema.safeParse(breedingStatusId); 

    !statusValidation.success 
        ? res.status(400).json({
            message: "Invalid status",
            error: statusValidation.error
          })
        : null;

    !breedingIdValidation.success 
        ? res.status(400).json({
            message: "Invalid breeding status ID",
            error: breedingIdValidation.error
        })
        : null;

    const updatedBreedingStatus = await Breeding.findByIdAndUpdate(breedingStatusId, {
            status: status,
        });

        !updatedBreedingStatus?
             res.status(404).json({ message: "Breeding status not found" }) : null;
        
        const { requesterPet, requestedPet } = updatedBreedingStatus;
        
        const user1 = await user.findOne({ Pets: requesterPet });
        const user2 = await user.findOne({ Pets: requestedPet });

        (!user1 || !user2)?
            res.status(404).json({ message: "Users not found" }): null;
             
        const updateMatched = new matched({
            pet1 : updatedBreedingStatus.requesterPet,
            pet2 : updatedBreedingStatus.requestedPet,
            userOfPet1 : user1._id,
            userOfPet2 : user2._id,
        })
        !updateMatched? res.status(404).json({ message: "Not Matched" }): null;
        await updateMatched.save();
       
        await Breeding.deleteOne({_id: breedingStatusId});
       return res.status(200).json({
            message: "Breeding status updated successfully",
            updatedBreedingStatus,
            updatedMatchedStatus : updateMatched
        })
}

export default matchController;