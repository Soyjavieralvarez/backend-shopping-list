import jwt from "jsonwebtoken";
import User from '../models/Users.js';

const checkAuth = async (req, res, next) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
        ){

            try {
                token = req.headers.authorization.split(' ')[1];

                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log(decoded)
               
                req.user = await User.findById(decoded.id).select("-password -confirm -token -createdAt -updateAt -__v")
                console.log(req.user);

                return next()
            } catch (error) {
                return res.status(404).json({msg: 'Hubo un error'})
            }
    }

    if(!token) {
        const error = new Error('Token no valido')
        res.status(401).json({msg: error.message})
    }

    next();
};

export default checkAuth