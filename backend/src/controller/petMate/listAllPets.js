import zod from "zod";
import Pet from "../../models/pet/PetSchema.js";
import User from "../../models/User/UserSchema.js";

const listAllPet = async (req,res) =>{
     //FInd all users
     //Find all their pets
     // remove pet of the logged in user
     // send respose
     const {userId} = req.params;
     if(!userId){
        return res.send({status:"no user id"});
     }
      
     const user = await User.findById(userId)
     if(!user){
         return res.status(404).json({message: "User not found"})
     }
     const pets = user.Pets;
    //  const allPets = await Pet.find({});
    //  const filteredPets = allPets.filter(pet=>!pets.includes(pet._id));
     const filteredPets = await Pet.find({_id:{$nin:pets}});

     return res.send(filteredPets);

}

export default listAllPet;