
import { Router } from 'express'
// import orderController from '../Controllers/order.controller.js'
//import cartController from '../controllers/cart.controller.js';
import orderController from '../controllers/order.controller.js';
import isLoggedIn from '../middlewares/isauth.middleware.js';

const path = 'order';
const router = new Router()

router.post(`/${path}/checkout`, isLoggedIn, orderController.create );


// (req, res) => {   
    //res.render('checkout',{ data : cartController.getProducts  }) ;
    // res.render('checkout', { user : req.session.user})  
//}
//);
// router.get(`/${path}/checkout2`, isLoggedIn,  (req, res) => 
// {   
//     console.log('checkout')
//     res.render('checkout2') ;
//     // res.render('checkout', { user : req.session.user})  
// }
// );
// router.get(`/${path}/checkout3`, isLoggedIn,  (req, res) => 
// {   
//     console.log('checkout')
//     res.render('checkout3') ;
//     // res.render('checkout', { user : req.session.user})  
// }
// );
// orderRouter.get('/', isLoggedIn, orderController.getAll)
// orderRouter.post('/', isLoggedIn, orderController.create)


export default router
