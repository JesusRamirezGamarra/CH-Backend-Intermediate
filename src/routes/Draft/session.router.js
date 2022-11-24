import { Router } from 'express';
import moment from 'moment'
import validateUserRegister from '../validators/user.validator.js'
import passport from 'passport';

const router = Router();
router.post('/register',
    validateUserRegister,
    passport.authenticate(
        'register',
        {
            failureRedirect:'/register-error',
            failureMessage: true,
            failureFlash: true
            // sucessRedirect:'/register-success',                        
            // badRequestMessage: "falta username / password",                    
        }
        ,(err,user,info)=>{
            if (err) { return next(err); }
            if (!user) { return res.redirect('/'); }

            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send(user);
            });
        }
    ),
    (req,res)=>{
        try{
            res.status(200).send({status:"success",payload:req.user._id,message:"User's Created successfully"})
        }
        catch(err){
            logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
        }
    }
)

router.post('/login', 
    (req, res, next) =>{
        passport.authenticate('login', 
        (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                //res.status(500).send({ message: info.message });
                // res.status(500).send({status:"error",payload:req.user._id,message:info.message})
                req.flash('error_message',info.message)
                res.status(500).send({  status:"error",
                    message:"user not logged in",
                    payload:{data:res.locals.error_message.map( err => {return {message : err,parameter : undefined,value : undefined}})}})                
            } else {
                req.session.authenticated = true;
                req.session.user = {username: user.username,name:user.name,id: user._id}
                res.status(200).send({status:"success",payload:req.session.user.id,message:"user successfully logged in"})
            }
        }
    )(req, res, next);
});


// router.post('/login',
//             passport.authenticate(
//                 'login',
//                 {
//                     failureRedirect: '/login-error', 
//                     failureMessage: true,
//                     failureFlash: true
//                 }
//             ),
//             async(req,res)=>{
//                 try{
//                     req.session.user = {username: req.user.username,name:req.user.name,id: req.user._id}
//                     res.send({status:"success",payload:req.user._id,message:"User successfully logged in "})                            
//                 }
//                 catch(err){
//                     logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
//                 }                    
//             }
// )


export default router;
