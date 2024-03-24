import { User } from "../models/index.js";
import { getFilePath } from "../utils/image.js";
import bcrypt from 'bcryptjs'

const getLoggedUser = async (req, res)=> {
    const {user_id} = req.user;

    try {
        const response = await User.findById(user_id).select(["-password"])
        if(!response){
            res.status(400).send({message: 'No se encontró el usuario'})
        } else {
            res.status(200).send({
                message: 'Usuario encontrado con éxito',
                user: response
            })
        }

    } catch (error) {
        res.status(500).send({message: 'Error del servidor'})
        
    }
}

const getAllUsers = async (req, res)=> {
    try {
        const { user_id } = req.user
        const users = await User.find({_id: {$ne: user_id}}).select(["-password"])
        if(!users){
            res.status(400).send({message: 'No se encontró el usuario'})
        } else {
            res.status(200).send({users})
        }
    } catch (error) {
        res.status(500).send({message: 'Error del servidor'})
    }
}

const getUserById = async (req, res)=> {
    try {
        const { id } = req.params
        const user = await User.findById(id).select(["-password"])
        if(!user){
            res.status(400).send({message: 'No se encontró el usuario'})
        } else {
            res.status(200).send({user})
        }
    } catch (error) {
        res.status(500).send({message: 'Error del servidor'})
    }
}

const updateUser = async (req, res) => {

    try {
        const { user_id } = req.user
        const userData = req.body
        if(req.files.avatar){
            const imagePath = getFilePath(req.files.avatar)
            userData.avatar = imagePath
        }
        if(userData.password){
            const salt = bcrypt.genSaltSync(10)
            const hashPassword = bcrypt.hashSync(userData.password, salt)
            userData.password = hashPassword
        }
        console.log(userData)

        const result = await User.findByIdAndUpdate({_id: user_id}, userData).select(["-password"])

        if(!result){
            res.status(400).send({message: 'Error al actualizar el usuario'})
        } else {
            res.status(200).send({
                message: 'Actualización de usuario exitosa',
                user: result
        })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Error del servidor'})
        
    }
}

export const userController = {
    getLoggedUser,
    getAllUsers,
    getUserById,
    updateUser
}