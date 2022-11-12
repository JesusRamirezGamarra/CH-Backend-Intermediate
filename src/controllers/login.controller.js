import { Router } from 'express'
import cartController from '../Controllers/cart-controller.js'
import isAuth from '../Middlewares/is-auth.js'


const cartRouter = new Router()
cartRouter.get('/', isAuth, cartController.getProducts)
cartRouter.post('/', isAuth, cartController.addProduct)
cartRouter.delete('/:productId', isAuth, cartController.deleteProduct)

export default cartRouter
