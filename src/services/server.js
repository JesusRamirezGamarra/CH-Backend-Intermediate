
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import MongoStore from 'connect-mongo';
import moment from 'moment'
import flash from 'connect-flash'
// import { io } from "socket.io-client";
//import { Server } from "socket.io";
// import compression from "compression";
import {___dirname} from '../utils/path-directory.js';
import config from '../config/config.js'
import initializePassport from '../config/passportLocal.config.js';
import { logger } from '../utils/logger.js';
// import pino from "pino"
// import cors from 'cors'
import viewsRouter from '../routes/views.router.js'
import sessionRouter from '../routes/session.router.js'
import randomRouter from '../routes/random.router.js'
import profileRouter from '../routes/profile.route.js'
import productRouter from "../routes/product.router.js"
import cartRouter from "../routes/cart.router.js";

import services from '../daos/index.js'




////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();
// app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static( ___dirname +  "\\public"));
// app.use(cors());
// app.use(cookieParser());


////////////////////////////////////////////////////////////////////////////////////////////////
/// Passport session
// Uninitialised = false    - It means that Your session is only Stored into your storage, when any of the Property is modified in req.session
// Uninitialised = true     - It means that Your session will be stored into your storage Everytime for request. It will not depend on the modification of req.session.
// resave = true            - It means when the modification is performed on the session it will re write the req.session.cookie object.
// resave = false           - It will not rewrite the req.session.cookie object. the initial req.session.cookie remains as it is.
////////////////////////////////////////////////////////////////////////////////////////////////
const ttlSeconds = 60;
app.use(session({
    store:MongoStore.create({
        mongoUrl:config.SESSION.URL_CONNECT,
        ttl:3600
    }),
    secret:config.SESSION.SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: {
        maxAge: ttlSeconds * 1000 * 30,
        expires: ttlSeconds * 1000 * 30,
      // httpsonly:true,
      // path:"/",
    },  
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
////////////////////////////////////////////////////////////////////////////////////////////////
/// Handle Bars - Engine
////////////////////////////////////////////////////////////////////////////////////////////////

// For Windows : 'C:\\Results\\user1\\file_23_15_30.xlsx'
// For Mac/Linux: /Users/user1/file_23_15_30.xlsx
const layoutDirPath   = ___dirname + "\\views\\layouts";
const defaultLayerPth = ___dirname + "\\views\\layouts\\main.hbs";
const partialDirPath  = ___dirname + "\\views\\partials";
app.engine('.hbs',handlebars.engine({
    extname : ".hbs",
    layoutsDir: layoutDirPath,
    defaultLayout: defaultLayerPth,
    partialsDir: partialDirPath,
}));
app.set('view engine','.hbs');
app.set('views',___dirname+'\\views')
////////////////////////////////////////////////////////////////////////////////////////////////
// Global variables
////////////////////////////////////////////////////////////////////////////////////////////////
// Connect flash
app.use(flash());
app.use(function(req, res, next) {
    res.locals.success_alert_message = req.flash('success_alert_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
});
////////////////////////////////////////////////////////////////////////////////////////////////
/// Routers
////////////////////////////////////////////////////////////////////////////////////////////////
app.use('/',randomRouter);
app.use('/',viewsRouter);
app.use('/',profileRouter);
app.use('/api/session',sessionRouter);
// app.use('/',loginRouter)
// app.use('/api/sessions',sessionsRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
////////////////////////////////////////////////////////////////////////////////////////////////
// MANEJO DE RUTAS INEXISTENTES
////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/',async(req,res)=>{
    if(!req.session.user) return res.redirect('/login')
    let user = req.session.user
    let listCart = await services.cartService.getCartProducts(req.session.user.cartID)
    let total = await services.cartService.getTotal(user.cartID)
    let endShop = `<form class="endshopForm"action="http://localhost:8080" method="post"><button id="endshop" class="endshop" formaction="/api/carts/endshop">Finalizar compra</button></form>`    
    if(listCart.length ==0){
        endShop = '<p>No tienes productos agregados</p>'
        res.render("viewHome",{user,listCart,endShop,total})
    }else{ 
        res.render("viewHome",{user,listCart,endShop,total})}
    io.on('connection',async(socket)=>{
        let products = await services.productsService.getAll()
        let datos = JSON.parse(products)
        datos.push({cartID:user.cartID})
        io.emit('lista',datos)    
    })   

    res.render("HomeAdmin",
                {user:user}
    );
})  


app.use( (req,res) => {
    try{
        let fyh = new moment().format('DD/MM/YYYY HH:mm:ss')
        let url =  req.protocol + '://' + req.get('host') + req.originalUrl;
        logger.warn(`${fyh}  || PATH: ${req.path} || Mehotd: ${req.method} || status: Page Not Fount || URL: ${url }`)
        res.status(404).render('404')
    }
    catch(err){
        logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
    }
})


export default app;