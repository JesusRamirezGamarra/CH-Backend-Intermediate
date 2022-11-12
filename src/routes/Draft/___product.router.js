import { Router } from 'express'
import productController from '../controllers/product.controller.js'
import isAuth from '../middlewares/is-auth.js'
import isAdmin from '../middlewares/is-admin.js'


const productRouter = new Router()
productRouter.get('/', productController.getAll)
productRouter.get('/:id', productController.getById)
productRouter.post('/', isAuth, isAdmin, productController.create)
productRouter.put('/:id', isAuth, isAdmin, productController.updateById)
productRouter.delete('/:id', isAuth, isAdmin, productController.deleteById)


export default productRouter
