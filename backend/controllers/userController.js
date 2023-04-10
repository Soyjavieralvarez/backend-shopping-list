import User from "../models/Users.js";
import generateID from "../helpers/generateID.js";


const register = async (req, res) => {
    //Avoid duplicate records
    const { email } = req.body;
    const userExists = await  User.findOne({email: email})

    if(userExists) {
        const error = new Error('El usuario ya está registrado')
        return res.status(400).json({msg: error.message});
    }
    
    try{
        const user = new User(req.body)
        user.token = generateID();
        const storedUser = await user.save()
        res.json(storedUser)
    } catch (error) {
    console.log(error)
    }
};

const authenticate = async(req, res) => {
    const { email, password } = req.body

    // check if user exists
    const user = await User.findOne({email})
    if(!user){
        const error = new Error("El usuario no existe")
        return res.status(404).json({msg: error.message});
    }
    // check if user is confirmed
    
    if(!user.confirmed){
        const error = new Error("Tu cuenta no ha sido confirmada")
        return res.status(403).json({msg: error.message});
    }
    // check the password

    
};

export {
    register,
    authenticate
}