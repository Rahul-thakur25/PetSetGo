import zod from 'zod';
import Pet from "../../models/pet/PetSchema.js";

// Define validators using Zod
const isPetId = zod.string();
const isStatus = zod.enum(['true', 'false']); // Corrected enum definition

const updateBreedingStatus = async (req, res) => {
    const { petId } = req.params;
    const { status } = req.body;

    // Validate inputs
    const petIdParser = isPetId.safeParse(petId);
    const statusParser = isStatus.safeParse(status);

    if (!petIdParser.success) {
        return res.status(404).json({
            message: "Invalid pet ID",
            error: {
                petId: petId,
            }
        });
    }

    if (!statusParser.success) {
        return res.status(400).json({
            message: "Invalid status",
            error: {
                status: status,
            }
        });
    }

    try {
        // Find the existing pet by ID
        const existingPet = await Pet.findById(petId);
        
        if (!existingPet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        // Update the breeding status
        existingPet.AvailableForBreeding = status === 'true'; // Convert string to boolean

        // Save the updated pet
        await existingPet.save();

        return res.status(200).json({
            message: "Breeding status updated successfully",
            updatedPet: existingPet,
        });
    } catch (error) {
        console.error("Error updating breeding status:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default updateBreedingStatus;