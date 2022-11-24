import  { Router } from 'express';
import moment from 'moment'
import { logger } from '../utils/logger/isLogger.js';
import isAuthSession from '../middlewares/is.auth.js'
import isAdmin from '../middlewares/is.admin.js';
import productController from '../controllers/product.controller.js';
// import io from '../app.js';

const router = Router();
router.get('/about',(req,res)=>{
    res.render('about');
})

router.get('/register', async(req, res) => {
    res.render('register');
});
// router.get('/register-success', async(req, res) => {
//     res.render('usuarioCreado');
// });
// router.get('/register-error', async(req, res) => {
//     res.send({  status:"error",
//                 message:"User's Not Created",
//                 payload:{data:res.locals.error_message.map( err => {return {message : err,parameter : undefined,value : undefined}})}})
//     // res.render('register',
//     //     { name: "Kushan", age: 24},
//     //     (err,html)=>{
//     //         res.status(209).send({    
//     //             status:"error",
//     //             message:"User's Not Created",
//     //             payload:{data:res.locals.error_message.map( err => {return {message : err,parameter : undefined,value : undefined}})}
//     //         })
//     //     }
//     // )
//     // res.render("register", {
//     //     name: "Kushan", age: 24
//     // });


//     //res.render('register');
//     //res.render('register-error')
// });
router.get('/',productController.getAll)
    
    // productController.getAll()
    // res.render("Home", {user:req.session.user} );

    // if(!req.session.user) return res.redirect('/login')
    // if(!req.session.user) return res.render("Home");
    // else return res.render("HomeAdmin", {user:req.session.user} );


    //     let user = req.session.user

    // res.render("HomeAdmin",
    //             {user:user}
    // );
//     let listCart = await services.cartsService.getCartProducts(req.session.user.cartID)
//     let total = await services.cartsService.getTotal(user.cartID)
//     let endShop = `<form class="endshopForm"action="http://localhost:8080" method="post">
//     <button id="endshop" class="endshop" formaction="/api/carts/endshop">Finalizar compra</button>
//     </form>
// `
//     if(listCart.length ==0){
//         endShop = '<p>No tienes productos agregados</p>'
//         res.render("viewHome",{user,listCart,endShop,total})
//     }else{ 
//         res.render("viewHome",{user,listCart,endShop,total})}
//     io.on('connection',async(socket)=>{
//         let products = await services.productsService.getAll()
//         let datos = JSON.parse(products)
//         datos.push({cartID:user.cartID})
//         io.emit('lista',datos)
    
//     })    
// })
router.get('/admin',async(req,res)=>{
    if(!req.session.user) return res.redirect('/login')
        let user = req.session.user

    res.render("HomeAdmin",
                {user:user}
    );
})    


router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/logout', (req, res) => {
    try{
        const datos = req.session.user;
        const nombre = datos.username;
        req.session.destroy()
        res.render('logout',{nombre})
    }
    catch(err){
        logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
    }    
});


export default router;