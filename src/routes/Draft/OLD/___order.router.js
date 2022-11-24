import { Router } from 'express'
import orderController from '../controllers/order.controller.js'
import isAuth from '../middlewares/is.auth.js'


const orderRouter = new Router()
orderRouter.get('/', isAuth, orderController.getAll)
orderRouter.post('/', isAuth, orderController.create)


export default orderRouter
