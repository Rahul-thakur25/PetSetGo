import mongoose from "mongoose";

const MedicalSchema = new mongoose.Schema({
    PicUrl: {
        type: String,
        required: true, // The URL of the uploaded medical history picture
    },
}, { timestamps: true });

export default mongoose.model('Medical', MedicalSchema);
