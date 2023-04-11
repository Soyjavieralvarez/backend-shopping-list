import express from "express";
const router = express.Router();

import { 
    register,
    authenticate,
    confirm,
    fogotPassword,
    checkOutToken,
    newPassword,
    profile,
         } from "../controllers/userController.js";

import checkAuth from "../middleware/checkAuth.js";

//Authentication, registration and confirmation of users

router.post('/', register) //Route: Create a new user
router.post('/login', authenticate) //Route: Authenticate users
router.get('/confirm/:token', confirm) //Route: Confirm Token with JWT
router.post('/forgot-password', fogotPassword) //Route: Forgot the password 
router.get('/forgot-password/:token', checkOutToken) //Route: Recover account via email 
router.post('/forgot-password/:token', newPassword) //Route: New Password 
// router.route('/forgot-password/:token').get(checkOutToken).post(newPassword) //? With next we have this other compact option for when route is repeated
router.get('/profile', checkAuth, profile);



export default router;