
import { Router } from 'express';
import passport from 'passport';
import { hasJsonResult } from '../config/config.js';
// import userController from '../controllers/user.controller.js';
import isAuthSession from '../middlewares/isauth.middleware.js';
import validateUserRegister from '../validators/user.validator.js'


const router = new Router()
// router.post('/', userController.create)
router.get('/profile', isAuthSession, async(req, res) => {
    res.render('profile');
});

router.post('/profile', isAuthSession, async(req, res) => {
    
});

router.post('/register',
    validateUserRegister,
    (req, res, next) =>{
        passport.authenticate(
            'register',
            {
                failureMessage: true
            },
            (err, user, info) => {
                if (err)  return next(err);
                if (!user) {
                    return res.status(403).send({
                        status:403,
                        result:hasJsonResult.ERROR,
                        message: 'User not created',
                        code: 'user_not_created',
                        payload:{  data : undefined }, 
                        cause: info.message,
                    });
                } else {
                    // req.session.authenticated = true;
                    // req.session.user = {username: user.username,name:user.name,id: user._id, role: user.role};
        // userController.create(req);
                    // // // // // // next(req.session.user);
                    res.status(200).send({
                        status:'200',
                        result:hasJsonResult.SUCCESS,
                        message:'user created successfully',
                        code:'user_created_successfully', 
                        payload:req.session,
                        cause: undefined ,
                    })
                }
            }        
        )(req, res, next);
    }    
);

router.post('/register2',
    validateUserRegister,
    (req, res, next) =>{
        passport.authenticate(
            'register',
            {
                failureMessage: true
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


export default router
