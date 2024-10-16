import zod from "zod";
import uploadOnCloudinary from "../utils/cloudinary.js";
import RescueAdoptionSchema from "../models/RescueAndAdoption.js";

const descriptionParser = zod.string().min(5);
const typeParser = zod.enum(['Rescue', 'Adoption']);
const RescueAdoption = async (req,res) =>{
    const {description,type} = req.body;
    const isDescription = descriptionParser.safeParse(description);
    const isType = typeParser.safeParse(type);
    if(!isDescription.success || !isType.success){
        return res.status(400).json({
            message: "Invalid Description or Type",
            error: isDescription.error || isType.error
        });
    }
    if(!req.file){
        return res.status(400).json({
            message: "No Image Uploaded",
        });
    }
    const uploadedFile = await uploadOnCloudinary(req.file.path);
    if(!uploadedFile){
        return res.status(500).json({
            message: "Failed to Upload Image on Cloudinary",
        });
    }
    const rescueAdoption = new RescueAdoptionSchema({
        typeOfHelp: type,
        picUrl: uploadedFile.url,
        description: description,
    });
    await rescueAdoption.save();

    return res.status(201).json({
        message: "Rescue or Adoption Request Created Successfully",
        rescueAdoption,
    }); 
}
export default RescueAdoption;