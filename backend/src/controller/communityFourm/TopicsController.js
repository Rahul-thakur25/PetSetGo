import zod from "zod";
import TopicModel from '../../models/community/TopicModel.js';
import CategoryModel from "../../models/community/CategoryModel.js";
import uploadOnCloudinary from "../../utils/cloudinary.js";
const nameParser = zod.string().min(2);
const contentParser = zod.string().min(10).max(60);
const IdParser = zod.string();
const Topic = async (req, res) => {
    try {
        const { name, content } = req.body;
        const { categoryId,userId } = req.params;
        // Validate the name and content using zod parsers
        const isName = nameParser.safeParse(name);
        const isContent = contentParser.safeParse(content);
        const isCategoryId = IdParser.safeParse(categoryId);
        const isUserId = IdParser.safeParse(userId);
        if (!isName.success || !isContent.success) {
            return res.status(400).json({
                message: "Invalid Name or Content type/length",
                error: isName.error || isContent.error
            });
        }
        if (!isCategoryId.success ||!isUserId.success) {
            return res.status(400).json({
                message: "Invalid category ID or user ID",
                error: isCategoryId.error || isUserId.error
            });
        }
        // Check if a file is uploaded
        if (!req.file){
            return res.status(400).json({
                message: "No image uploaded",
            });
        }
        // Upload the file to Cloudinary
        const uploadedFile = await uploadOnCloudinary(req.file?.path);

        if (!uploadedFile) {
            return res.status(500).json({
                message: "Failed to upload image on Cloudinary",
            });
        }
        // Create a new topic in the TopicModel
        const topic = new TopicModel({
            Name: name,
            Content: content,
            Pics: uploadedFile.url,
            category: categoryId,
            User: userId,
        });
        await topic.save(); 
        const user = await TopicModel.findByIdAndUpdate(topic._id).populate('User');
        await CategoryModel.findByIdAndUpdate(
            categoryId, 
            { $push: { topics: topic._id } }, 
            { new: true, useFindAndModify: false } 
        );
        return res.status(201).json({
            message: "Topic created successfully",
            topic,
            user
        });
    } catch (error) {
        console.error("Error creating topic:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
export default Topic;