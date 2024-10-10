import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
       Content:{
        type: String,
        required: true,
       },

       pics:{
        type: [String],
       },
       
       User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
       }
},{
    timestamps: true,
})

export default mongoose.model("Reply", replySchema);