import  { Router } from 'express';
import moment from 'moment'
import passport from 'passport';
import { logger } from '../utils/logger/isLogger.js';
import validateUserRegister from '../validators/user.validator.js'
import {hasJsonResult} from '../config/config.js'

import passportJWTLoginController from '../controllers/auth/passport-jwt-auth.controller.js';
import passportLocalLoginController from '../controllers/auth/passport-local-auth.controller.js';



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
                    return res.status(200).send({
                        status:300,
                        result:hasJsonResult.ERROR,
                        message: 'user not logged in',
                        code: 'user_not_logged_in',
                        payload:{  data : undefined }, 
                        cause: info.message,
                    });
                } else {
                    req.session.authenticated = true;
                    req.session.user = {username: user.username,name:user.name,id: user._id, role: user.role}
                    res.status(200).send({
                        status:'200',
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



export default router;