
import { Router } from 'express'
import chatController from '../Controllers/chat.controller.js'


const router = new Router()
router.get('/', chatController.show)


export default Router
