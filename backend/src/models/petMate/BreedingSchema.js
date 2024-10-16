import mongoose from 'mongoose'; // Ensure this line is present

const BreedingSchema = new mongoose.Schema({
    requesterPet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true,
    },
    requestedPet: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Pet',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    }
}, {
    timestamps: true,
});

export default mongoose.model('breedingStatus', BreedingSchema);