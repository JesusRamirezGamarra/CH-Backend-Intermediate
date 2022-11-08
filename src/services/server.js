
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
// import compression from "compression";
import MongoStore from 'connect-mongo';
import {___dirname} from '../utils/pathDirectory.js';

import viewsRouter from '../routes/views.router.js'
import sessionsRouter from '../routes/sessions.router.js'
import randomRouter from '../routes/random.router.js'
import config from '../config/config.js'
import initializePassport from '../config/passportLocal.config.js';
import { logger } from '../utils/logger.js';

import moment from 'moment'
import flash from 'connect-flash'

// import mongoose from 'mongoose';


// import config from '../config/config.js'
// import passport from 'passport';
// import initializePassport from '../config/passport.config.js';
// import cookieParser from 'cookie-parser';
// import moment from 'moment'


// console.log(___dirname)

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
        mongoUrl:config.mongo.MONGO_URL,
        ttl:3600
    }),
    secret:'c0derSecretConpapasquesitoYunaMalteada',
    resave:false,
    saveUninitialized:false,
    cookie: {
      maxAge: ttlSeconds * 1000,
      expires: ttlSeconds * 1000,
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
const defaultLayerPth = ___dirname + "\\views\\layouts/main.hbs";
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
app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/randoms', randomRouter);

////////////////////////////////////////////////////////////////////////////////////////////////
// MANEJO DE RUTAS INEXISTENTES
////////////////////////////////////////////////////////////////////////////////////////////////
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
