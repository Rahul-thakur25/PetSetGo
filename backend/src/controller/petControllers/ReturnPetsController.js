import zod from 'zod';
import User from "../../models/User/UserSchema.js"

const isUserId = zod.string();
const returnPets = async(req,res) => {
    const {userId} = req.params;

    const UserIdParser = isUserId.safeParse(userId);

    if(!UserIdParser.success){
        return res.status(400).json({ message: 'Invalid user id' });
    }
    
    const user = await User.findById(userId).populate('Pets');
    
    if(!user){
        return res.status(404).json({ message: 'No such user or invalid user ID' });
    }

    const pets = user.Pets;
    return res.json({ message: 'Pets fetched successfully', pets });
}

export default returnPets;