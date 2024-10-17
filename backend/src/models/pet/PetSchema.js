import mongoose from "mongoose";
import { optional } from "zod";

const PetSchema = new mongoose.Schema({
PetName: {
type: String,
required: true,
trim: true, // Remove whitespace
},

PetType: {
type: String,
required: true,
enum: ['Dog', 'Cat', 'Bird', 'Fish', 'Reptile', 'Rodent', 'Other'], // Optional: restrict to specific types
},

Breed: {
type: String,
required: true,
trim: true,
},

Age: {
type: Number,
required: true,// Age in years
},

Weight: {
type: Number,
required: true, // Weight in kilograms
},
AvailableForBreeding: {
    type : Boolean,
    default: false,
    required: optional,
},
Gender:{
    type: String,
    required: true,
},

PicUrl: {
type: String,
required: false, // Optional field for pet picture URL
},

Prescription:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Medical'
}]
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Create the Pet model
export default mongoose.model('Pet', PetSchema);

//done