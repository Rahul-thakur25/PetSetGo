import express from 'express';
import mongoose from 'mongoose';
import authRoutes from "./routes/authRoutes.js"
import communityRoutes from "./routes/CommunityFourmRoutes.js"
import MedRouter from "./routes/MedRouter.js"
import petRoutes from "./routes/petRoutes.js"
import petMateRoutes from "./routes/petMateRoutes.js"
import VetArticleRoute from "./routes/VetArticleRoute.js"
import bodyParser from 'body-parser';
import dotenv from "dotenv";

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
app.use(petRoutes);
app.use(MedRouter);
app.use(VetArticleRoute);
app.use(petMateRoutes);
app.listen(process.env.PORT,()=>{
    console.log('Server is running Now');
});