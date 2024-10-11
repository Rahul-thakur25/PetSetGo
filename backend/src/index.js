import express from 'express';
import mongoose from 'mongoose';
import authRoutes from "./routes/authRoutes.js"
import communityRoutes from "./routes/CommunityFourm.js"
import bodyParser from 'body-parser';
import dotenv from "dotenv"
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
dotenv.config({
    path: './.env'
});
app.use(bodyParser.urlencoded({ extended: true }));


const mongooseConnection = async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    }
    catch(err){
        console.error('Failed to connect to MongoDB', err);
    }
}
mongooseConnection();
app.use("/api/auth", authRoutes);
app.use(communityRoutes);
app.listen(process.env.PORT,()=>{
    console.log('Server is running Now');
})