// import uploadOnCloudinary from "../../utils/cloudinary.js";
// import MedicalSchema from"../../models/Medical/MedicalSchema.js"
// import PetSchema from "../../models/pet/PetSchema.js";
// const medprescription = async (req,res)=>{
//     const petId = req.params
// if(!req.file){
//     return res.status(400).json({message: "No Prescription uploaded"})

// }

// console.log(req.file)

// const uploadedfile= await uploadOnCloudinary(req.file?.path)

// if(!uploadedfile){
//     return res.status(500).json({message: "Failed to upload Prescription on Cloudinary"})
// }

// console.log(uploadedfile)

// const medFile= new MedicalSchema({
//     PicUrl: uploadedfile.url,
// })
// medFile.save()
// return res.status(200).json({
//     message:"Medical file is uploded successfully",
//     medFile
// })




// }


// export default medprescription;

import uploadOnCloudinary from "../../utils/cloudinary.js";
import MedicalSchema from "../../models/Medical/MedicalSchema.js";
import PetSchema from "../../models/pet/PetSchema.js";

const medprescription = async (req, res) => {
    const { petId } = req.params;  // Get the pet ID from request params

    if (!req.file) {
        return res.status(400).json({ message: "No Prescription uploaded" });
    }

    console.log(req.file);  // Log the file for verification

    // Upload the file to Cloudinary
    const uploadedFile = await uploadOnCloudinary(req.file.path);
    
    if (!uploadedFile) {
        return res.status(500).json({ message: "Failed to upload Prescription on Cloudinary" });
    }

    console.log(uploadedFile);  // Log the uploaded file details

    try {
        // Create a new Medical entry in the database
        const medFile = new MedicalSchema({
            PicUrl: uploadedFile.url,
        });

        // Save the Medical record
        await medFile.save();

        // Update the Pet document by adding the new Medical record's ID to the Prescription array
        const updatedPet = await PetSchema.findOneAndUpdate(
            { _id: petId },  // Find the Pet by its ID
            { $push: { Prescription: medFile._id } },  // Push the new Medical record's ID into the Prescription array
            { new: true }  // Return the updated Pet document
        );

        if (!updatedPet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        return res.status(200).json({
            message: "Medical file uploaded successfully and Pet record updated",
            medFile,
            updatedPet,
        });

    } catch (error) {
        console.error(error);  // Log any errors
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default medprescription;
