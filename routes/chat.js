import express from 'express'
import { chatController} from '../controllers/index.js'
import { mdwAuth } from '../middlewares/index.js';

const api = express.Router()

// Routes
api.post('/create', [mdwAuth.asureAuth], chatController.create)

api.get('/', [mdwAuth.asureAuth], chatController.getAll)

api.delete('/:id', [mdwAuth.asureAuth], chatController.deleteChat)

api.get('/:id', [mdwAuth.asureAuth], chatController.getChat)



export const chatRoutes = api