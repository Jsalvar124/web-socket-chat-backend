import express from 'express'
import { mdwAuth } from '../middlewares/index.js'
import { userController } from '../controllers/index.js'
import multipart from 'connect-multiparty'

const mdwUpload = multipart({uploadDir: './uploads/avatar'})

const api = express.Router()

api.get('/getUser',[mdwAuth.asureAuth], userController.getLoggedUser )
api.patch('/me', [mdwAuth.asureAuth, mdwUpload], userController.updateUser )

api.get('/getUsers',[mdwAuth.asureAuth], userController.getAllUsers )

api.get('/:id',[mdwAuth.asureAuth], userController.getUserById )



export const userRoutes = api