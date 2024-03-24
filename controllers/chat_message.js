import { get } from 'mongoose'
import { Chat, ChatMessage } from '../models/index.js'
import { io, getFilePath } from '../utils/index.js'


const send = async (req, res) => {
    const { chat_id, message } = req.body
    const { user_id } = req.user //el middleware de autenticación, decodifica el token y envía el user_id en el request.
    try {
        // Validate req.body
        if (!chat_id || !message) {
            return res.status(400).send({ message: "Chat o mensaje nulos." });
        }

        // Check if chat exists
        const chatExists = await Chat.findById(chat_id);
        if (!chatExists) {
            return res.status(404).send({ message: "No se encontró el id del chat." });
        }

        const newMessage = new ChatMessage({
            chat: chat_id,
            user: user_id,
            message,
            type: "TEXT"
        })
        // guardar en base de datos
        await newMessage.save()
        //distribuir el mensaje a todos los sockets
        const data = await newMessage.populate("user")
        io.sockets.in(chat_id).emit("message", data);
        //notificación en caso de que esté fuera del chat
        io.sockets.in(`${chat_id}_notify`).emit("message_notify", data)
        res.status(201).send({
            message: "Un nuevo mensaje ha sido creado con éxito",
            data
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error || "Error del servidor" })
    }

}

const sendImage = async (req, res) => {
    const { chat_id } = req.body;
    const { user_id } = req.user;

    try {
        const newMessage = new ChatMessage({
            chat: chat_id,
            user: user_id,
            message: getFilePath(req.files.image),
            type: "IMAGE"
        })
        console.log(newMessage)
        // guardar en base de datos
        await newMessage.save()
        const data = await newMessage.populate("user")
        io.sockets.in(chat_id).emit("message", data);
        //notificación en caso de que esté fuera del chat
        io.sockets.in(`${chat_id}_notify`).emit("message_notify", data)
        return res.status(201).send({
            message: "Imagen ha sido creada con éxito",
            data
        })

    } catch (error) {
        return res.status(500).send({ message: 'Error del servidor' })

    }

}
// get all messages from a chat id.
const getAll = async (req, res) => {
    const { chatId } = req.params;

    try {
        const messages = await ChatMessage.find({ chat: chatId }).sort({ createdAt: 1 }) // return messages sorted by creation time.
        const total = await ChatMessage.countDocuments({ chat: chatId })
        return res.status(200).send({
            message: 'Mensajes obtenidos con éxito.',
            total: messages.length,
            messages
        })
    } catch (error) {
        return res.status(500).send({ message: 'Error del servidor.' })
    }
}

const getTotalMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const total = await ChatMessage.countDocuments({ chat: chatId });
        res.status(200).send({
            message: 'Total de mensajes recuperado con éxito.',
            total
        })
    } catch (error) {
        res.status(500).send({ message: 'Error del servidor.' })
    }
}

const getLastMessage = async (req, res) => {
    const { chatId } = req.params;
    try {
        const lastMessage = await ChatMessage.findOne({ chat: chatId }).sort({ createdAt: -1 });
        res.status(200).send({
            message: 'Último mensaje recuperado con éxito.',
            lastMessage
        })
    } catch (error) {
        res.status(500).send({ message: 'Error del servidor.' })
    }
}

export const chatMessageController = {
    send,
    sendImage,
    getAll,
    getTotalMessages,
    getLastMessage
}