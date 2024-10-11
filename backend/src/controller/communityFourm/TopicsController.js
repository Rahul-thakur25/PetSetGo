import zod from "zod";
import TopicModel from '../../models/community/TopicModel.js';
import CategoryModel from "../../models/community/CategoryModel.js";
import uploadOnCloudinary from "../../utils/cloudinary.js";

const nameParser = zod.string().min(2);
const contentParser = zod.string().min(10).max(60);

const Topic = async (req, res) => {
    try {
        const { name, content } = req.body;
        const { categoryId } = req.params;

        // Validate the name and content using zod parsers
        const isName = nameParser.safeParse(name);
        const isContent = contentParser.safeParse(content);

        if (!isName.success || !isContent.success) {
            return res.status(400).json({
                message: "Invalid Name or Content type/length",
                error: isName.error || isContent.error
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
            category: categoryId
        });

        await topic.save(); // Save the topic

        // Use findByIdAndUpdate to add the topicId to the category's topics array
        await CategoryModel.findByIdAndUpdate(
            categoryId, 
            { $push: { topics: topic._id } }, // Push topic ID to topics array
            { new: true, useFindAndModify: false } // Return updated category and disable deprecated option
        );

        // Respond with the created topic
        return res.status(201).json({
            message: "Topic created successfully",
            topic
        });
    } catch (error) {
        console.error("Error creating topic:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export default Topic;