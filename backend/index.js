import express from 'express'
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js'

const app = express();
app.use(express.json());

dotenv.config()

connectDB();

// Routing 

app.use("/api/users", userRoutes);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})