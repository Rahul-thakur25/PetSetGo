import Topic from "../../models/community/TopicModel.js";
import Reply from "../../models/community/ReplyModel.js";
import zod from "zod";

// Zod schema for validating content and pics

const contentParser = zod.string().min(1, 'Content cannot be empty')
   
const replyController = async (req, res) => {
    const { topicId, userId } = req.params; // Extract topicId and userId from request params
    const { content } = req.body; // Get content and pics from request body

    // Validate reply content and pics using Zod
    const isContentSafe = contentParser.safeParse(content);
    if(!isContentSafe.success){
        return res.status(400).json({
            message: "Invalid content type/length",
            error: isContentSafe.error
        });
    }

    try {
        // Create a new reply
        const reply = new Reply({
            Content: content,  // Required content field
            User: userId,      // The user creating the reply
        });
        if(!reply){
            return res.status(400).json({
                message: "error  in creating reply",
            }); // Return an error if the reply object is invalid or undefined
        }
        // Save the reply to the database
        await reply.save();

        // Find the topic by ID and add the reply's ObjectId to its replies array
        const topic = await Topic.findByIdAndUpdate(
            topicId,
            { $push: { Reply: reply._id } },  // Push the reply's ID into the topic's replies array
            { new: true }  // Return the updated document
        );

        // Check if the topic exists
        if (!topic){
            return res.status(404).send({
                message: 'Topic not found',
            });
        }

        // Respond with success message and the created reply
        res.status(201).send({
            message: 'Reply added successfully',
            reply,
        });

    } catch (error) {
        // Handle any server errors
        res.status(500).send({
            message: 'Server error while adding reply',
            error: error.message,
        });
    }
};

export default replyController;
