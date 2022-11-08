// /api/sessions
import {Router} from 'express';
// import userService from '../models/User.js';
// import { createHash, isValidPassword } from '../utils/cripto.js';
import passport from 'passport';
import moment from 'moment'
import validateUserRegister from '../validators/users.js'
// import { doesNotMatch } from 'assert';

const router = Router();
// const passportOptions = { 
//     badRequestMessage: "falta username / password" 
// };




////////////////////////////////////////////////////////////////////////////
router.post('/register',
            validateUserRegister,
            // (req,res,next)=>{
                passport.authenticate(
                    'register',
                    {
                        failureRedirect:'/register-error',
                        sucessRedirect:'/register-success',
                        failureMessage: true,
                        failureFlash: true
                        // badRequestMessage: "falta username / password",                    
                    }
                    // ,(err,user,info)=>{
                    //     if (err) { return next(err); }
                    //     if (!user) { return res.redirect('/'); }

                    //     req.logIn(user, function(err) {
                    //         if (err) { return next(err); }
                    //         return res.send(user);
                    //     });
                    // }
                )
                // ,
                // (req,res,next)
                // =>{
                //     try{
                //         console.log(req.body)
                //         console.log(req.user);
                    
                //         res.send({status:"success",payload:req.user._id,message:"User's Created successfully"})
                //     }
                //     catch(err){
                //         logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
                //     }
                // }
            )


            // },
            // passport.authenticate(
            //     'register',
            //     {
            //         failureRedirect:'/register-error',
            //         failureMessage: true
            //         // badRequestMessage: "falta username / password",                    
            //     },
            //     (err,user,info)=>{
            //     //     next(err)
            //         if(err) return next(err);
            //     //     // if(!user) return res.status(200).redirect('register')


            //     //     // if(info.status == 'error'){
            //     //     //     res.status(409).send({
            //     //     //         status:info.status,
            //     //     //         message:info.message,
            //     //     //         // playload : {data:string.empty},
            //     //     //     })    
            //     //     // }
            //     }
            // ),
            // (req,res,next)=>{
            //     try{
            //         console.log(req.body)
            //         console.log(req.user);

            //         // if (err) {
            //         //     return next(err);
            //         // }
            //         // if (!user) 
            //         //     return res.render('register-error')
                    
            //         res.send({status:"success",payload:req.user._id,message:"User's Created successfully"})
            //         //res.redirect('/usuarioCreado')    

            //         // console.log({error:err})
            //         // if (err) {
            //         //     return next(err);
            //         // }
            //         // if (!user) 
            //         //     return res.render('register-error')
            //         //res.render('usuarioCreado')                
                    
            //         // res.redirect('/usuarioCreado')    

            //         // res.send(
            //         //     {
            //         //         status:"success",payload:req.user._id
            //         //     }
            //         // );
            //     }
            //     catch(err){
            //         logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
            //     }
            // })







// router.get('/registerfail',(req,res)=>{
//     console.log("Something is wrong")
//     res.status(500).send({status:"error",error:""})
// })

////////////////////////////////////////////////////////////////////////////
router.post('/login',
            passport.authenticate(
                'login',
                {
                    failureRedirect: '/login-error', 
                    failureMessage: true
                }
            ),
            async(req,res)=>{
                req.session.user = {
                    username: req.user.username,
                    name:req.user.name,
                    id: req.user._id
                }
                try{
                    console.log({
                                status:'success',
                                payload:req.session.user
                            })
                    // res.send(
                    //     {
                    //         status:'success',
                    //         payload:req.session.user
                    //     })
                    res.redirect('/datos')
                }
                catch(err){
                    logger.error(`${new moment().format('DD/MM/YYYY HH:mm:ss')} || PATH: ${req.path} || METHOD: ${req.method} || ERROR: ${err.message}`);
                }                    
            }
)
// router.get('/loginfail',(req,res)=>{
//     res.status(500).send({status:"error",error:"Error in login "})
// })



export default router;
