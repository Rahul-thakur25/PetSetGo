import zod from "zod";
import Pet from "../../models/pet/PetSchema.js";
import User from "../../models/User/UserSchema.js";

const listAllPet = async (req,res) =>{

     const {userId} = req.params;
     if(!userId){
        return res.send({status:"no user id"});
     }
     const user = await User.findById(userId)
     if(!user){
         return res.status(404).json({message: "User not found"})
     }
    const pets = user.Pets;
    const filteredPets = await Pet.find({
        _id: { $nin: pets },
        AvailableForBreeding: true
    });

     if(!filteredPets){
       return res.status(404).json({message: "Error in Filtering pets"}) 
     } 
     
     if(filteredPets.length==0){
        return res.status(404).json({message:"No pets found"});
     } 

     return res.status(200).json({
         message: "All available pets",
         pets: filteredPets,
     });
}
export default listAllPet;