import zod from 'zod';
import Breeding from "../../models/petMate/BreedingSchema.js";
import User from "../../models/User/UserSchema.js";

const idParser = zod.string();

const pendingRequests = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate userId
        if (!userId) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        const isuserId = idParser.safeParse(userId);
        if (!isuserId.success) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        // Find the user and populate their Pets
        const user = await User.findById(userId).populate('Pets');
        if (!user) {
            return res.status(404).json({ message: 'No such user or invalid user ID' });
        }

        // Get pet IDs owned by the user
        const userPetIds = user.Pets.map(pet => pet._id);

        // Check if the user has any pets
        if (userPetIds.length === 0) {
            return res.status(404).json({ message: 'No pets found for this user' });
        }
        // Fetch breeding requests where the user's pets are involved and populate pet data
        const breedingRequests = await Breeding.find({
            $or: [
                { requesterPet: { $in: userPetIds } },
                { requestedPet: { $in: userPetIds } }
            ]
        }).populate('requesterPet') 
        .populate('requestedPet');

        console.log(breedingRequests);
        if (breedingRequests.length === 0){
            return res.status(404).json({ message: 'No breeding requests found' });
        }
        return res.status(200).json(breedingRequests);
    } catch (error){
        console.error('Error fetching pending requests:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export default pendingRequests;