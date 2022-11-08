import  { Router } from 'express';
import os from 'os';
import compression from "compression";
import { logger } from '../utils/logger.js';
import moment from 'moment'

const router = Router();

// // Middleware
const isLoggedIn = (req, res, next) => {
    try{
        if(!req.isAuthenticated())  res.redirect('/login') 
        else    next();    
    }
    catch(err){
        logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
    }        
}



// router.get('/',(req,res)=>{
//     res.render('login');
// })



////////////////////////////////////////////////////////////////////////////
/* --------- REGISTER ---------- */
router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/register-success', (req, res) => {
    res.render('usuarioCreado');
});

/* ---------Error---------- */
router.get('/demo',(req, res) => {
    res.render("register", {
        name: "Kushan", age: 24
    });    
})

router.get('/register-error', (req, res) => {
    // res.send({    status:"error",
    //                 message:"User's Not Created",
    //                 payload:{data:res.locals.error_message.map( err => {return {message : err,parameter : undefined,value : undefined}})}})



    // res.render('register',
    //     { name: "Kushan", age: 24},
    //     (err,html)=>{
    //         res.status(209).send({    
    //             status:"error",
    //             message:"User's Not Created",
    //             payload:{data:res.locals.error_message.map( err => {return {message : err,parameter : undefined,value : undefined}})}
    //         })
    //     }
    // )

    res.render("register", {
        name: "Kushan", age: 24
    });


    //res.render('register');
    //res.render('register-error')
});

////////////////////////////////////////////////////////////////////////////

/* --------- LOGIN ---------- */
router.get('/',(req,res)=>{
    res.render('login');
})
router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/login-success',(req,res)=>{
    console.log('get: login-success');
    res.render('login');
})


/* --------- Error---------- */
router.get('/login-error', (req, res) => {
    res.render('login-error')
});

////////////////////////////////////////////////////////////////////////////

router.get('/data',(req,res)=>{
    try{
        if(!req.session.user) 
            return res.redirect('/login');
        res.render('data',{user:req.session.user});
    }
    catch(err){
        logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
    }
})



////////////////////////////////////////////////////////////////////////////

/* --------- DATOS ---------- */
router.get('/datos', isLoggedIn, async(req, res,) => {
    try{
        const datos = req.user
        const nombre = datos.username
        res.render('datos', {nombre})
    }
    catch(err){
        logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
    }        
})
/* --------- LOGOUT ---------- */
router.get('/logout', (req, res) => {
    try{
        const datos = req.user
        const nombre = datos.username
        req.session.destroy()
        res.render('logout',{nombre})
    }
    catch(err){
        logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
    }
    
});

////////////////////////////////////////////////////////////////////////////

const infodelProceso = {
    // [-] Argumentos de entrada  
    args: process.argv.slice(2),
    // [-] Path de ejecución
    execPath: process.cwd(),
    // [-] Nombre de la plataforma (sistema operativo)      
    plataforma: process.platform,
    // [-] Process id
    processID: process.pid,
    // [-] Versión de node.js      
    nodeVersion: process.version,
    // [-] Carpeta del proyecto
    carpeta: process.argv[1],
    // [-] Memoria total reservada (rss)
    memoria:  ` ${Math.round( JSON.stringify(process.memoryUsage.rss())/ 1024 / 1024 * 100) / 100} MB`,
    // [-] Numero de nucleos
    cantidadNucleos:  os.cpus().length,
}

/* --------- INFO ---------- */
router.get('/info',compression(), async(req, res,) => {
    try{
        // logger.error(`PATH: ${req.path} || METHOD: ${req.method}`)
        // logger.warn(`PATH: ${req.path} || METHOD: ${req.method}`)
        logger.info(`PATH: ${req.path} || METHOD: ${req.method}`)
        // logger.http(`PATH: ${req.path} || METHOD: ${req.method}`)
        // logger.verbose(`PATH: ${req.path} || METHOD: ${req.method}`)
        // logger.debug(`PATH: ${req.path} || METHOD: ${req.method}`)
        // logger.silly(`PATH: ${req.path} || METHOD: ${req.method}`)
        const data = infodelProceso
        res.render('info', {data})
    }
    catch(err){
        logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
    }
})


export default router;