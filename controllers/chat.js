import { Chat, ChatMessage } from '../models/index.js'

// Functions
const create = async (req, res)=> {
    const {participant_one, participant_two} = req.body

    try {
        const chatFound = await Chat.findOne({
            $or: [
                { participant_one: participant_one, participant_two: participant_two },
                { participant_one: participant_two, participant_two: participant_one }
            ]
        })
    
        if(chatFound){
            return res.status(200).send({message: "El chat entre los usuarios ya ha sido creado"})
        } else if(participant_one === participant_two){
            return res.status(200).send({message: "No es posible crear un chat con el mismo usuario"})
        } else {
            const newChat = new Chat({
                participant_one: participant_one, 
                participant_two: participant_two 
            })
            await newChat.save();
            res.status(201).send({
                message: "Un nuevo chat ha sido creado con éxito",
                chat: newChat
            })
        }
    } catch (error) {
        res.status(500).send({message: "Error del servidor"})
    }
}

const getAll = async (req, res) => {
    const { user_id } = req.user;
    try {
        const chats = await Chat.find({
            $or: [{participant_one: user_id}, {participant_two: user_id}]
        })
        .populate("participant_one", "-password")
        .populate("participant_two", "-password")
        .exec()
        return res.status(200).send({
            message: 'Chats encontrados con éxito',
            chats
        })
        
    } catch (error) {
        req.status(500).send({message:'Error en el servidor'})
        
    }
}

const deleteChat = async(req, res) => {
    const { id } = req.params
    console.log(`id to delete: ${id}`)
    try {
        const response = await Chat.findByIdAndDelete(id)
        if(!response){
            res.status(400).send({message: 'Error al eliminar el chat'})
        } else {
            res.status(200).send({message:'Chat eliminado con éxito'})
        }
    } catch (error) {
        res.status(500).send({message:'Error en el servidor'})
    }
}

const getChat = async(req, res) => {
    const { id } = req.params
    try {
        const response = await Chat.findById(id)
        .populate("participant_one", "-password")
        .populate("participant_two", "-password")
                
        if(!response){
            res.status(400).send({message:'Error al buscar el chat'})
        } else {
            const lastMessage = await ChatMessage.findOne({chat: id}).sort({createdAt: -1})

            const chatData = {
                ...response._doc,
                lastMessageDate: lastMessage ? lastMessage.createdAt : null
            };
            res.status(200).send({
                message:'Chat encontrado con éxito',
                chat: chatData
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({message:'Error en el servidor'})
    }
}


export const chatController = {
    create,
    getAll,
    deleteChat,
    getChat
}