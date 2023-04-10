import express from "express";
const router = express.Router();

import { register, authenticate } from "../controllers/userController.js";

//Authentication, registration and confirmation of users

router.post('/', register) //Route: Create a new user
router.post('/login', authenticate) //Route: Authenticate users




export default router;