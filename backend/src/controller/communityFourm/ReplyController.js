import Topic from "../../models/community/TopicModel.js";
import Reply from "../../models/community/ReplyModel.js";
import zod from "zod";
const contentParser = zod.string().min(1, 'Content cannot be empty')
const replyController = async (req, res)=>{
    const { topicId, userId } = req.params; 
    const { content } = req.body; 
    const isContentSafe = contentParser.safeParse(content);
    if(!isContentSafe.success){
        return res.status(400).json({
            message: "Invalid content type/length",
            error: isContentSafe.error
        });
    }
    try {
        const reply = new Reply({
            Content: content,  
            User: userId,
        });
        if(!reply){
            return res.status(400).json({
                message: "error  in creating reply",
            });
        }
        await reply.save();
        const topic = await Topic.findByIdAndUpdate(
            topicId,
            { $push: { Reply: reply._id } },
            { new: true }
        );

        if (!topic){
            return res.status(404).send({
                message: 'Topic not found',
            });
        }
        res.status(201).send({
            message: 'Reply added successfully',
            reply,
        });
    } catch (error) {
        res.status(500).send({
            message: 'Server error while adding reply',
            error: error.message,
        });
    }
};
export default replyController;