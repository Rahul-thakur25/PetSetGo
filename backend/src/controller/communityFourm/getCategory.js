import zod from 'zod';
import CategoryModel from "../../models/community/CategoryModel.js";

const userIdParser = zod.string();

const getCategories = async (req, res) => {
    const { userId } = req.params;
    const isuserId = userIdParser.safeParse(userId);
    if (!isuserId.success) {
        return res.status(400).json({ message: 'Invalid user id' });
    }
    try {
        const categories = await CategoryModel.find({});
        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }
        const user = await CategoryModel.find({}).populate('createdBy');
        res.json({ message: 'Categories fetched successfully', categories });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default getCategories;
