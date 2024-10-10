import express from 'express';
import mongoose from 'mongoose';
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

const mongooseConnection = async ()=>{
    try{
       await mongoose.connect('mongodb+srv://rahul:Rahul123@petsetgo.3kfuk.mongodb.net/?retryWrites=true&w=majority&appName=PetSetGo');
        console.log('Connected to MongoDB');
    }
    catch(err){
        console.error('Failed to connect to MongoDB', err);
    }
}
mongooseConnection();

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})