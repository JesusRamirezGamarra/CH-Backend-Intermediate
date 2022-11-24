import  { Router } from 'express';
import moment from 'moment'
import passport from 'passport';
import { logger } from '../utils/logger/isLogger.js';
import validateUserRegister from '../validators/user.validator.js'
import {hasJsonResult} from '../config/config.js'

import passportJWTLoginController from '../controllers/auth/passport-jwt.auth.js';
// import passportLocalLoginController from '../controllers/auth/passport-local.auth.js';



const router = Router();
router.post('/token', passportJWTLoginController.tokenLogin)
// router.post('/passport',passportLocalLoginController.localPassportLogin)

router.post('/passport', 
    (req, res, next) =>{
        passport.authenticate(
            'login', 
            {
                failureMessage: true,
            },
            (err, user, info) => {
                if (err)  return next(err);
                if (!user) {


                    // req.flash('error_message',info.message)




                    // return res.status(100).render("login",{
                    //     status:500,
                    //     result:hasJsonResult.ERROR,
                    //     message: 'user not logged in',
                    //     code: 'user_not_logged_in',
                    //     payload:{  data : undefined }, 
                    //     cause: info.message,
                    // });

                    return res.status(200).send({
                        status:300,
                        result:hasJsonResult.ERROR,
                        message: 'user not logged in',
                        code: 'user_not_logged_in',
                        payload:{  data : undefined }, 
                        cause: info.message,
                    });


                    // res.status(500).send({  
                    //     // status: 500,
                    //     result:hasJsonResult.ERROR,
                    //     message:'user not logged in',
                    //     code:'user_not_logged_in',
                    //     payload:{
                    //         data:res.locals.error_message.map( err => {
                    //         return {    message : err,
                    //                     parameter : undefined,
                    //                     value : undefined
                    //                 }
                    //         })
                    //     },
                    //     cause: undefined ,
                    // })                
                } else {
                    req.session.authenticated = true;
                    req.session.user = {username: user.username,name:user.name,id: user._id, role: user.role}
                    res.status(200).send({
                        // status:'200',
                        result:hasJsonResult.SUCCESS,
                        message:'user successfully logged in',
                        code:'user_successfully_logged_in', 
                        payload:req.session.user.id,
                        cause: undefined ,
                    })
                }
            }
        )(req, res, next);
    }
);

router.post('/register',
    validateUserRegister,
    (req, res, next) =>{
        passport.authenticate(
            'register',
            {
                // failureRedirect:'/register-error',
                failureMessage: true
                // ,
                // failureFlash: true
            },
            (err, user, info) => {
                if (err)  return next(err);
                if (!user) {

                    return res.status(200).send({
                        status:300,
                        result:hasJsonResult.ERROR,
                        message: 'User not created',
                        code: 'user_not_created',
                        payload:{  data : undefined }, 
                        cause: info.message,
                    });

                } else {
                    req.session.authenticated = true;
                    req.session.user = {username: user.username,name:user.name,id: user._id, role: user.role}
                    res.status(200).send({
                        status:'200',
                        result:hasJsonResult.SUCCESS,
                        message:'user created successfully',
                        code:'user_created_successfully', 
                        payload:req.session.user.id,
                        cause: undefined ,
                    })
                }
            }        
        )(req, res, next);
    }
);

    //,
    // (req,res)=>{
    //     try{
    //         res.status(200).send({
    //             // status:"200",
    //             result:hasJsonResult.SUCCESS,
    //             message:'user created successfully',
    //             code:'user_created_successfully',
    //             payload:req.user._id,
    //             cause: undefined ,
    //         })
    //     }
    //     catch(err){
    //         res.status(500).send({
    //             // status:"500",
    //             result:hasJsonResult.ERROR,
    //             message:'User not created',
    //             code:'user_not_created',
    //             payload:req.user._id,
    //             message:'User not created',
    //             cause: undefined ,
    //         })
    //         logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
    //     }
    // }
// )

export default router;