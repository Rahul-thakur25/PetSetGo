import zod from "zod";
import CategoryModel from "../../models/community/CategoryModel.js";
import uploadOnCloudinary from "../../utils/cloudinary.js"; 
const nameParser = zod.string().max(12); 
const tagParser = zod.string().max(10); 
const categoryList = async (req, res) => {
    try{
        const { name, tag } = req.body;
        const { userId } = req.params;
        const isName = nameParser.safeParse(name);
        const isTag = tagParser.safeParse(tag);
        if (!isName.success){
            return res.status(400).json({
                message: "Invalid input in name",
                error: isName.error,
            });
        }
        if (!isTag.success){
            return res.status(400).json({
                message: "Invalid input in tag",
                error: isTag.error,
            });
        }
        if(!req.file){
            return res.status(401).json({ message: 'file not uploaded' });
        }
        const uploadedFile = await uploadOnCloudinary(req.file.path);
        if(!uploadedFile){
            return res.status(500).json({ message: 'Failed to upload image on Cloudinary' });
        }
        const category = new CategoryModel({
            Name:name,
            tags: [tag], 
            createdBy: userId, 
            picUrl:uploadedFile.url || null,
        });
        if(!category){
            return res.status(400).json({
                message: "error  in creating category",
            }); 
        }
        await category.save();
        res.status(201).json({
            message: "Category created successfully",
            category,
        });
    }catch(error){
        res.status(500).json({
            message: "An error occurred while creating the category",
            error: error.message,
        });
    }
};
export default categoryList;