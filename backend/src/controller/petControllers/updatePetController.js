import zod from 'zod';
import Pet from '../../models/pet/PetSchema.js';
import uploadOnCloudinary from '../../utils/cloudinary.js';

// Define Zod schemas for validation
const genderParser = zod.enum(['Male', 'Female']);
const weightParser = zod.number().max(99);
const StringParser = zod.string();
const NumberParser = zod.number().min(0).max(99); // Updated to include min and max for age
const petTypeParser = zod.enum(['Dog', 'Cat', 'Bird', 'Fish', 'Reptile', 'Rodent', 'Other']);

const updatePet = async (req, res) => {
    const { name, type, age, weight, breed, gender } = req.body;
    const { petId } = req.params;
    const intage = parseInt(req.body.age); 
    const intWeight = parseInt(req.body.weight);
    // Validate inputs
    const isName = StringParser.safeParse(name);
    const isPetId = StringParser.safeParse(petId);
    const isAge = NumberParser.safeParse(intage);
    const isWeight = weightParser.safeParse(intWeight);
    const isBreed = StringParser.safeParse(breed);
    const isGender = genderParser.safeParse(gender);
    const isType = petTypeParser.safeParse(type);

 
    // Check for validation errors
    if (!isName.success || !isType.success) {
        return res.status(400).json({ message: 'Invalid name or pet type' });
    }
    if (!isPetId.success) {
        return res.status(400).json({ message: 'Invalid pet ID' });
    }
    if (!isAge.success) {
        return res.status(400).json({ message: 'Invalid age' });
    }
    if (!isWeight.success) {
        return res.status(400).json({ message: 'Invalid weight' });
    }
    if (!isBreed.success) {
        return res.status(400).json({ message: 'Invalid breed' });
    }
    if (!isGender.success) {
        return res.status(400).json({ message: 'Invalid gender' });
    }

    // Check if user is authenticated
    if (!req.file) {
        return res.status(401).json({message: 'file not found'});
    }

    // Check if a file was uploaded
    let picUrl;
    if (req.file) {
        const uploadFile = await uploadOnCloudinary(req.file.path);
        if (!uploadFile) {
            return res.status(500).json({ message: 'Failed to upload image on Cloudinary' });
        }
        picUrl = uploadFile.url; // Store the URL from the upload response
    }

    // Update the pet in the database
    const updatedPet = await Pet.findByIdAndUpdate(petId, {
        PetName: name,
        PetType: type,
        Age: intage,
        Breed: breed,
        Weight: intWeight,
        Gender: gender,
        PicUrl: picUrl, // Use picUrl only if a file was uploaded
    }, { new: true }); // Return the updated document

    // Check if the update was successful
    if (!updatedPet) {
        return res.status(404).json({ message: 'Pet update failed or pet not found' });
    }

    return res.status(200).json({
        message: "Updated pet successfully",
        updatedPet,
    });
};

export default updatePet;