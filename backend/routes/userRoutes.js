import express from "express";
const router = express.Router();

import { 
    register,
    authenticate,
    confirm
         } from "../controllers/userController.js";

//Authentication, registration and confirmation of users

router.post('/', register) //Route: Create a new user
router.post('/login', authenticate) //Route: Authenticate users
router.get('/confirm/:token', confirm) //Route: Confirm Token with JWT




export default router;