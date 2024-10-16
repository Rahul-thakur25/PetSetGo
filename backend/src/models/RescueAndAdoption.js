import mongoose from "mongoose";

const rescueOrAdoptSchema = new mongoose.Schema(
    {
        typeOfHelp :{
            type: String,
            required: true,
            enum: ['Rescue', 'Adopt']
        },
        picUrl:{
            type : 'string',
            required: true,
        },
        description:{
            type : 'string',
            required: true,
        }
    }
)

export default mongoose.model("Rescue", rescueOrAdoptSchema);
