import  { Router } from 'express';
import os from 'os';
import compression from "compression";
import { logger } from '../utils/logger.js';
import moment from 'moment'

const router = Router();

//Middleware
// const isLoggedIn = (req, res, next) => {
//     try{
//         if(!req.isAuthenticated())  res.redirect('/login') 
//         else    next();    
//     }
//     catch(err){
//         logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
//     }        
// }



router.get('/',(req,res)=>{
    res.render('login');
})
// router.get('/register',(req,res)=>{
//     res.render('register');
// })


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