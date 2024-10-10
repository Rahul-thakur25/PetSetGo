import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true,
        unique: true
    },
    Content:{
        type: String,
        required: true,
    },
    Pics:{
        type: String,
    },
    Reply:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
    }
},{
    timestamps:true,
})

export default mongoose.model("Topic", topicSchema);