import { Router } from 'express'
import infoController from '../controllers/info.controller.js'


const infoRouter = new Router()
infoRouter.get('/', infoController.serverInfo)


export default infoRouter
