import { Router } from 'express'
import cartController from '../../../controllers/cart.controller.js'
import isAuth from '../../../middlewares/is.auth.js'


const cartRouter = new Router()
cartRouter.get('/', isAuth, cartController.getProducts)
cartRouter.post('/', isAuth, cartController.addProduct)
cartRouter.delete('/:productId', isAuth, cartController.deleteProduct)


export default cartRouter
