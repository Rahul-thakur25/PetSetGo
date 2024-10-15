import express from 'express';
import {loginUser, registerUser, logoutUser} from "../controller/AuthController.js";
import  verifyJwt  from '../middlewares/verifyJwtMiddleware.js';


const router = express.Router();


router.post('/login', loginUser);


router.post('/logout',verifyJwt, logoutUser);

router.post('/register', registerUser);
/*
{
  "email": "john.doe@example.com",
  "password": "securePass123",
  "name": "John Doe",
  "phoneNo": "1234567890",
  "userName": "johndoe"
}
  */

export default router;