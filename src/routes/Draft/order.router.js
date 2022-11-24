import { Router } from 'express'
import orderController from '../Controllers/order-controller.js'
import isAuth from '../Middlewares/is-auth.js'


const router = new Router();
router.get('/', isAuth, orderController.getAll);
router.post('/', isAuth, orderController.create);


export default router;
