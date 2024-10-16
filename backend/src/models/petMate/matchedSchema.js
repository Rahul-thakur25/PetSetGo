import mongoose from "mongoose";
const BreedMatchSchema = new mongoose.Schema({
    pet1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet', // Reference to the Pet model
    },
    pet2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet', // Reference to the Pet model
    },
    userOfPet1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    userOfPet2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    }
}, {
    timestamps: true,
});
export default mongoose.model('matchedBreed',BreedMatchSchema);