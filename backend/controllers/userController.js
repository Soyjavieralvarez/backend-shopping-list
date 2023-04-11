import User from "../models/Users.js";
import generateID from "../helpers/generateID.js";
import generateJWT from "../helpers/generateJWT.js";


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
    if(await user.checkPassword(password)){
        res.json({
           _id: user._id,
           name: user.name,
           email: user.email,
           token: generateJWT(user._id),
        })
    } else {
        if(!user.confirmed){
        const error = new Error("La contraseña no es correcta")
        return res.status(403).json({msg: error.message});
    }
    }
};

const confirm = async (req, res) => {
  const { token } = req.params
  const userConfirm = await User.findOne({token});
  if(!userConfirm){
    const error = new Error("Token no válido")
    return res.status(403).json({msg: error.message});
  }

 try {
    userConfirm.confirmed = true;
    userConfirm.token = "";
    await userConfirm.save();
    res.json({msg: 'Usuario confirmado correctamente'})
    
 } catch (error) {
    console.log(error)
 }
}

const fogotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({email})
    if(!user){
        const error = new Error("El usuario no existe")
        return res.status(404).json({msg: error.message});
    }

    try {
        user.token = generateID(),
        await user.save();
        res.json({ msg: "Revisa tu carpeta de correo, a veces llega a no deseado o SPAM, te he enviado un correo con las intrucciones para recuperar tu cuenta" })
    } catch (error) {
        console.log(error)
    };
};

const checkOutToken = async (req, res) => {
    const { token } = req.params;

    const validToken = await User.findOne({ token })
    if(validToken){
        res.json({msg: 'El Token es valido y el usuario existe'})
    } else {
       const error = new Error('El Token no es valido');
       return res.status(404).json( {msg: error.message} )
    };
};

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ token });

    if(user){
        user.password = password;
        user.token = '';
        try {
            await user.save();
            res.json({ msg:"La contraseña ha sido modificada correctamente"});
        } catch (error) {
            console.log(error)
        }
    } else {
       const error = new Error('El Token no es valido');
       return res.status(404).json({ msg: error.message });
    };
};

const profile = async (req, res) =>{
   const { user } = req

   res.json(user);
}

export {
    register,
    authenticate,
    confirm,
    fogotPassword,
    checkOutToken,
    newPassword,
    profile,
}