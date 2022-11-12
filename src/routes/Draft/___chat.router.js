import { Router } from 'express'
import chatController from '../controllers/chat.controller.js'


const chatRouter = new Router()
chatRouter.get('/', chatController.show)


export default chatRouter
