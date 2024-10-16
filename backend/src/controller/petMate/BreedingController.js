import zod from 'zod';
import Breeding from '../../models/petMate/BreedingSchema.js'; // Ensure this points to the correct model

// Define Zod parsers for pet IDs
const petIdParser = zod.string();

const BreedingController = async (req, res) => {
    // Destructure pet IDs from request parameters
    const { reqPetId, resPetId } = req.params;

    // Validate pet IDs
    const isReqPetId = petIdParser.safeParse(reqPetId);
    const isResPetId = petIdParser.safeParse(resPetId);

    if (!isReqPetId.success || !isResPetId.success){
        return res.status(400).json({
            message: "Invalid pet ID",
            error: isReqPetId.error || isResPetId.error,
        });
    }
    try{
        // Create a new breeding request
        const breedingRequest = new Breeding({
            requesterPet: reqPetId,
            requestedPet: resPetId,
        });

        // Save the breeding request to the database
        await breedingRequest.save();

        return res.status(200).json({
            message: "Breeding Request Created Successfully",
            breedingRequest,
        });
    } catch (error) {
        console.error("Error saving breeding request:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export default BreedingController;