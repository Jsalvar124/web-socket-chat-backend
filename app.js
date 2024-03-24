import 'dotenv/config';
import express from "express";
import {initSocketServer} from './utils/index.js'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import { authRoutes, userRoutes, chatRoutes, chatMessageRoutes } from "./routes/index.js";


const app = express();
const server = http.createServer(app);
initSocketServer(server);

//configure body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Configure static folder
app.use(express.static('./uploads'))

//Configure Header HTTP-CORS
app.use(cors())

//Configure Logger.
app.use(morgan('dev'))

//Configure routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/chat', chatMessageRoutes)


export { server }

