import { config } from 'dotenv'
config();

import mongoose from "mongoose";
import { server } from "./app.js";
import { PORT, IP_SERVER, DB_HOST, DB_PASSWORD, DB_USER } from "./constants.js";
import { io } from "./utils/socketServer.js";


const mongoDbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`

try {
    const connection = mongoose.connect(mongoDbURL)
    if(connection){
        server.listen(PORT, ()=>{
            console.log('########')
            console.log('API REST')
            console.log('########')
            console.log(`http://${IP_SERVER}:${PORT}/api`)
        
            io.sockets.on('Connection', (socket) => {
                console.log('Nuevo usuario en la app')
        
                socket.on('disconnect', ()=> {
                    console.log('usuario desconectado')
                })
            
                socket.on('suscribe', (room)=> {
                    socket.join(room)
                    console.log('usuario suscrito')
                })
        
                socket.on('unsuscribe', (room)=> {
                    socket.leave(room)
                    console.log('usuario abandonó la sala')
                })
            })
        
        
        })
    }
} catch (error) {
    console.log(error)
}


