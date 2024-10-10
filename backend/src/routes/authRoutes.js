import express from 'express';
import {loginUser, registerUser} from "../controller/AuthController.js";


const router = express.Router();


router.post('/login', loginUser);

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