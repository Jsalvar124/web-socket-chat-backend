import express from 'express'
import { authController } from "../controllers/index.js";
import { mdwAuth } from '../middlewares/index.js';

const api = express.Router()

//register endmpoint
api.post('/register', authController.register)
api.post('/login', authController.login)
api.post('/refresh_access_token', authController.refreshAccessToken)

//Test Auth middleware
api.post('/test', mdwAuth.asureAuth, (req,res) => {
    res.send(req.user)
} )

export const authRoutes = api;