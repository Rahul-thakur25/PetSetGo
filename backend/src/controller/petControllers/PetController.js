// import zod from "zod";
// import uploadOnCloudinary from "../../utils/cloudinary.js";
// import Pet from "../../models/pet/PetSchema.js";
// import User from "../../models/User/UserSchema.js";

// const nameParser = zod.string();
// const typeParser = zod.enum(['Dog', 'Cat', 'Bird', 'Fish', 'Reptile', 'Rodent', 'Other']);
// const breedParser = zod.string();
// const ageParser = zod.number().max(99, { message: "Age must be 99 or below." });
// const weightParser = zod.number();
// const genderParser = zod.enum(['Male', 'Female']);

// const petController = async (req, res) => {
//     const { name, type, breed, age, weight,gender } = req.body; // Corrected 'weigth' to 'weight'
//     const {userId} = req.params;
//     // Parse and validate fields
//     const isName = nameParser.safeParse(name);
//     const isType = typeParser.safeParse(type);
//     const isBreed = breedParser.safeParse(breed);
//     const isAge = ageParser.safeParse(Number(age)); // Convert to number for validation
//     const isWeight = weightParser.safeParse(Number(weight)); // Convert to number for validation
//     const isGender = genderParser.safeParse(gender);
    
//     if(!userId){
//         return res.status(401).json({ message: "User ID is required" });
//     }
//     // Check if all fields are valid
//     if (!isName.success) {
//         res.send({ field: "name", msg: "Invalid name" });
//     }
//     if (!isType.success) {
//         res.send({ field: "type", msg: "Invalid type. Must be one of: 'Dog', 'Cat', 'Bird', 'Fish', 'Reptile', 'Rodent', 'Other'" });
//     }
//     if (!isBreed.success) {
//         res.send({ field: "breed", msg: "Invalid breed" });
//     }
//     if (!isAge.success) {
//         res.send({ field: "age", msg: isAge.error.issues[0].message });
//     }
//     if (!isWeight.success) {
//         res.send({ field: "weight", msg: "Invalid weight" });
//     }
//     if (!isGender.success) {
//         res.send({ field: "gender", msg: "Invalid gender. Must be 'Male' or 'Female'" });
//     }

//     // Check for uploaded file
//     if (!req.file) {
//         return res.status(400).json({ message: "No image uploaded" });
//     }

//     try {
//         const uploadedFile = await uploadOnCloudinary(req.file.path); // Ensure file path is valid
//         if (!uploadedFile) {
//             return res.status(500).json({ message: "Failed to upload image on Cloudinary" });
//         }

//         // Create new pet entry
//         const newPet = new Pet({
//             PetName: name,
//             PetType: type,
//             Breed: breed,
//             Age: age,
//             Weight: weight, // Use the corrected variable here
//             PicUrl: uploadedFile.url,
//             Gender: gender,
//         });
//         // Save new pet to the database
//         await newPet.save();

//         const user = await User.findOne({userId});

//         if (!user){
//             return res.status(404).json({ message: "User not found" });
//         }
//         user.Pets.push(newPet._id);
//         return res.status(201).json({ message: "Pet created successfully", pet: newPet });
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// export default petController;
import zod from "zod";
import uploadOnCloudinary from "../../utils/cloudinary.js";
import Pet from "../../models/pet/PetSchema.js";
import User from "../../models/User/UserSchema.js";

// Define validators using zod
const nameParser = zod.string();
const typeParser = zod.enum(['Dog', 'Cat', 'Bird', 'Fish', 'Reptile', 'Rodent', 'Other']);
const breedParser = zod.string();
const ageParser = zod.number().max(99, { message: "Age must be 99 or below." });
const weightParser = zod.number();
const genderParser = zod.enum(['Male', 'Female']);

const petController = async (req, res) => {
    const { name, type, breed, age, weight, gender } = req.body;
    const { userId } = req.params;

    // Parse and validate fields
    const isName = nameParser.safeParse(name);
    const isType = typeParser.safeParse(type);
    const isBreed = breedParser.safeParse(breed);
    const isAge = ageParser.safeParse(Number(age)); // Convert to number for validation
    const isWeight = weightParser.safeParse(Number(weight)); // Convert to number for validation
    const isGender = genderParser.safeParse(gender);

    if (!userId) {
        return res.status(401).json({ message: "User ID is required" });
    }

    // Check if all fields are valid and send specific errors
    if (!isName.success) {
        return res.status(400).json({ field: "name", msg: "Invalid name" });
    }
    if (!isType.success) {
        return res.status(400).json({ field: "type", msg: "Invalid type. Must be one of: 'Dog', 'Cat', 'Bird', 'Fish', 'Reptile', 'Rodent', 'Other'" });
    }
    if (!isBreed.success) {
        return res.status(400).json({ field: "breed", msg: "Invalid breed" });
    }
    if (!isAge.success) {
        return res.status(400).json({ field: "age", msg: isAge.error.issues[0].message });
    }
    if (!isWeight.success) {
        return res.status(400).json({ field: "weight", msg: "Invalid weight" });
    }
    if (!isGender.success) {
        return res.status(400).json({ field: "gender", msg: "Invalid gender. Must be 'Male' or 'Female'" });
    }

    // Check for uploaded file
    if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
    }

    try {
        // Upload the pet's picture to Cloudinary
        const uploadedFile = await uploadOnCloudinary(req.file.path);
        if (!uploadedFile) {
            return res.status(500).json({ message: "Failed to upload image on Cloudinary" });
        }

        // Create new pet entry
        const newPet = new Pet({
            PetName: name,
            PetType: type,
            Breed: breed,
            Age: age,
            Weight: weight,
            PicUrl: uploadedFile.url,
            Gender: gender,
        });

        // Save new pet to the database
        await newPet.save();

        // Find the user by ID and associate the pet with the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add the newly created pet to the user's list of pets
        user.Pets.push(newPet._id);
        await user.save();

        return res.status(201).json({ message: "Pet created successfully", pet: newPet });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default petController;