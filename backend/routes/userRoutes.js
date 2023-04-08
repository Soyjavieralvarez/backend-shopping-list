import express from "express";
const router = express.Router();

import { register } from "../controllers/userController.js";

//Autenticación, registro y confirmación de usuarios

router.post('/', register) //Creación de un nuevo usuario



export default router;