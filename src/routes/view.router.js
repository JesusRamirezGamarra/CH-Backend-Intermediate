import  { Router } from 'express';
import moment from 'moment'
import { logger } from '../utils/logger/isLogger.js';
// import isAuthSession from '../middlewares/is.auth.js'
import isAdmin from '../middlewares/isadmin.middleware.js';
import logout from '../middlewares/logout.middleware.js'
import productController from '../controllers/product.controller.js';


const router = Router();

router.get('/',         productController.getAll);
router.get('/about',    (req,res)=>res.render('about'));
router.get('/login',    (req,res)=>res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/admin',    isAdmin, (req,res)=>  res.render("HomeAdmin", {user: req.session.user} ) )    
router.get('/logout',   logout);


export default router;


