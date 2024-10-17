import zod from 'zod';
import CategoryModel from '../../models/community/CategoryModel.js';
const categoryIdParser = zod.string()
const getTopics = async(req,res)=>{
    const { categoryId,userId } = req.params;
    const isCategoryId = categoryIdParser.safeParse(categoryId);
    const isUserId = categoryIdParser.safeParse(userId);
    if(!isCategoryId.success){
        return res.status(400).json({ message: 'Invalid category id' });
    }
    if(!isUserId.success){
        return res.status(400).json({ message: 'Invalid user id' });
    }
    const Topics = await CategoryModel.find({}).populate('topics'); 
    if(!Topics.success){
        return res.status(404).json({ message: 'No topics found' });
    }
    return res.status(200).json({ message: 'Topics fetched successfully',Topics});
}
export default getTopics;