import mongoose from 'mongoose';

const BreedingSchema = new mongoose.Schema({
    requesterPet:{
        type : String,
        required: true,
    },
    requestedPet:{
        type : String,
        required: true,
    },
    status:{
        type : String,
        required: true,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    }
},{
    timestamps: true,
});
export default mongoose.model('breedingStatus', BreedingSchema);