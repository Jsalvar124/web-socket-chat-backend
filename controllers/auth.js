import { User } from "../models/index.js";
import bcrypt from 'bcryptjs'
import { jwt } from "../utils/jwt.js";

const register = async (req, res) => {
    const { email, password } = req.body;

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    
    try {
        const newUser = new User({
            email: email.toLowerCase(),
            password: hashPassword
        });

        await newUser.save();
        res.status(201).send({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(400).send({
            message: 'Error al registrar el usuario',
            error: error.message
        });
    }
};

const login = async(req, res) => {
    const {email, password} = req.body;

    const lowerCaseEmail = email.toLowerCase();

    try {
        const user = await User.findOne({email: lowerCaseEmail})

        bcrypt.compare(password, user.password, (bcryptError, check) =>{
            if (bcryptError) {
                res.status(500).send({message: 'Error del servidor'})
            } else if(!check){
                res.status(400).send({message: 'Usuario o contraseña incorrectos'})
            } else {
                res.status(200).send({
                    message: 'Login exitoso',
                    user_id: user._id,
                    access: jwt.createAccessToken(user),
                    refresh: jwt.createRefreshToken(user)
                })
            }
        })

    } catch (error) {
        res.status(500).send({message: 'Error en login'})
    }
}

const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body

    if(!refreshToken){
        res.status(400).send({message: 'Token Requerido'})
    } else {
        const hasExpired = jwt.hasExpiredToken(refreshToken);
        if(!hasExpired){
            try {
                const { user_id } = jwt.decodeToken(refreshToken)
                const user = await User.findById(user_id) 
                res.status(200).send({
                    message: 'Token actualizado con éxito',
                    accessToken: jwt.createAccessToken(user)
                })
            } catch (error) {
                res.status(500).send({message: error.message})
            }
            
        } else {
            res.status(400).send('El token expiró')
        }
    }  
}
export const authController = {
    register,
    login,
    refreshAccessToken
};
