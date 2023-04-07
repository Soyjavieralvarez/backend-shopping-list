import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js'

const app = express();

dotenv.config()

connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})