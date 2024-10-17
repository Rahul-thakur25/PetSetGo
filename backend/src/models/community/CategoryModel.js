import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true,
        unique: true
    },
    tags:{
        type: [String],
        required: true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    topics:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
    },
    picUrl:{
        type: String
    }
},{
    timestamps: true,
})

export default mongoose.model("Category", categorySchema);