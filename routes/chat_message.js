import express from 'express'
import { chatMessageController } from '../controllers/index.js'
import multipart from 'connect-multiparty'
import { mdwAuth } from '../middlewares/index.js';

const mdwUpload = multipart({uploadDir: './uploads/image'})

const api = express.Router()

//Routes
api.post('/message', [mdwAuth.asureAuth], chatMessageController.send)

api.post('/message/image', [mdwAuth.asureAuth, mdwUpload], chatMessageController.sendImage)

api.get('/message/:chatId', [mdwAuth.asureAuth], chatMessageController.getAll)

api.get('/message/:chatId', [mdwAuth.asureAuth], chatMessageController.getAll)

api.get('/message/total/:chatId', [mdwAuth.asureAuth], chatMessageController.getTotalMessages)

api.get('/message/last/:chatId', [mdwAuth.asureAuth], chatMessageController.getLastMessage)





export const chatMessageRoutes = api
