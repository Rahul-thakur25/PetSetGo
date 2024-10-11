import zod from "zod";
import uploadOnCloudinary from "../../utils/cloudinary.js";
import Pet from "../../models/pet/PetSchema.js";

const nameParser = zod.string();
const typeParser = zod.enum(['Dog', 'Cat', 'Bird', 'Fish', 'Reptile', 'Rodent', 'Other']);
const breedParser = zod.string();
const ageParser = zod.number().max(99, { message: "Age must be 99 or below." });
const weightParser = zod.number();

const petController = async (req, res) => {
    const { name, type, breed, age, weight } = req.body; // Corrected 'weigth' to 'weight'
    
    // Parse and validate fields
    const isName = nameParser.safeParse(name);
    const isType = typeParser.safeParse(type);
    const isBreed = breedParser.safeParse(breed);
    const isAge = ageParser.safeParse(Number(age)); // Convert to number for validation
    const isWeight = weightParser.safeParse(Number(weight)); // Convert to number for validation

    // Check if all fields are valid
    if (!isName.success || !isType.success || !isBreed.success || !isAge.success || !isWeight.success) {
        return res.status(400).json({ errors: [{ msg: "Invalid input type" }] });
    }

    // Check for uploaded file
    if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
    }

    try {
        const uploadedFile = await uploadOnCloudinary(req.file.path); // Ensure file path is valid
        if (!uploadedFile) {
            return res.status(500).json({ message: "Failed to upload image on Cloudinary" });
        }

        // Create new pet entry
        const newPet = new Pet({
            PetName: name,
            PetType: type,
            Breed: breed,
            Age: age,
            Weight: weight, // Use the corrected variable here
            PicUrl: uploadedFile.url
        });

        // Save new pet to the database
        await newPet.save();
        return res.status(201).json({ message: "Pet created successfully", pet: newPet });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default petController;
