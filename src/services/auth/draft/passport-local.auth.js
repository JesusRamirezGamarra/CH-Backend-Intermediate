import passport from 'passport';
import LoginModel from '../../models/auth/login.auth.js'
import { userDao } from '../../daos/user/index.js'
import isValidPassword from '../../utils/encript/string.encript.js'
import {hasJsonResult} from '../../config/config.js'


class LoginService {
    #loginModel
    #userDao
    #isValidPassword
    constructor(loginModel, userDao, isValidPassword) {
        this.#loginModel = loginModel
        this.#userDao = userDao
        this.#isValidPassword = isValidPassword
    }

    passportLogin = async (req,res, next) =>{
        try {
            // const loginModel = new this.#loginModel(req.body)
            // const loginDto = loginModel.dto
            // const user = await this.#userDao.getByEmail(loginDto.email)
            // const login = await this.#isValidPassword(loginDto.password, user.password)

            passport.authenticate('login', 
            (err, user, info) => {
                if (err)  return next(err);
                if (!user) {
                    // req.flash('error_message',info.message)
                    return {  
                        status: 500,
                        result: hasJsonResult.ERROR,
                        message:'user not logged in',
                        code:'user_not_logged_in',
                        payload:{data:res.locals.error_message.map( err =>      {
                            return {    message : err,
                                        parameter : undefined,
                                        value : undefined
                                    }})},
                        cause: undefined ,
                        }

                    // res.status(500).send({  
                    //     //status: 500,
                    //     result:hasJsonResult.ERROR,
                    //     message:'user not logged in',
                    //     code:'user_not_logged_in',
                    //     payload:{data:res.locals.error_message.map( err =>      {
                    //         return {    message : err,
                    //                     parameter : undefined,
                    //                     value : undefined
                    //                 }})},
                    //     cause: undefined ,
                    //             })                

                } else {
                    // req.session.authenticated = true;
                    // req.session.user = {username: user.username,name:user.name,id: user._id, role: user.role}
                    return {
                        
                        status: 201,
                        result: hasJsonResult.SUCCESS,
                        message:'user not logged in',
                        code:'user_not_logged_in',
                        payload:{data: { username: user.username,name:user.name,id: user._id, role: user.role } },
                        cause: undefined ,                        
                    }
                    // res.status(200).send({
                    //     // status:'200',
                    //     result:hasJsonResult.SUCCESS,
                    //     message:'user successfully logged in',
                    //     code:'user_successfully_logged_in', 
                    //     payload:req.session.user.id,
                    //     cause: undefined ,
                    // })
                }
            })(req, res, next);

        } 
        catch (err) {
            if (!err.expected)
            err = {
                status: 500,
                err: {
                    result: hasJsonResult.ERROR,
                    message: 'Error logging in.',
                    code: 'login_error',
                    payload:{  data : undefined}, 
                    cause: undefined,
                }                
            }
            delete err.expected
            throw err
        }
    }

}



// const  data =  passport.authenticate(
//     'login',
//     (err, user, info) => {
//         if (err)  return next(err);
//         if (!user) {
//             req.flash('error_message',info.message)
//             res.status(500).send(
//                 { 
//                     status:"error",
//                     message:"user not logged in",
//                     payload:{
//                         data:res.locals.error_message.map( err => {
//                             return {
//                                 message : err,
//                                 parameter : undefined,
//                                 value : undefined
//                             }})
//                         }
//                 }   
//             )
//         } else {
//             req.session.authenticated = true;
//             req.session.user = {username: user.username,name:user.name,id: user._id,role: user.role}
//             return {status:"success",payload:req.session.user.id,message:"user successfully logged in"}
//         }
//     }
// )(req, res, next);
// console.log(req.session.user)
// console.log(data)
// return {data:'ok'}

const loginService = new LoginService(LoginModel, userDao, isValidPassword)
export default loginService
