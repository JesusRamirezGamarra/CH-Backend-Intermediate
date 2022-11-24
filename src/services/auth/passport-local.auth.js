import passport from 'passport';
import LoginModel from '../../models/auth/login-auth.model.js'
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
            // const loginModel = new this.#loginModel(req.body);
            // const loginDto = loginModel.dto;
            // const user = await this.#userDao.getByEmail(loginDto.email);
            // const login = await this.#isValidPassword(loginDto.password, user.password);
            // let user; 
            // (req, res, next) =>{
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
                        // req.session.authenticated = true;
                        req.session.user = {username: user.username,name:user.name,id: user._id, role: user.role}
                        // return res.status(200).send({
                        //     status:'200',
                        //     result:hasJsonResult.SUCCESS,
                        //     message:'user successfully logged in',
                        //     code:'user_successfully_logged_in', 
                        //     payload:req.session.user.id,
                        //     cause: undefined ,
                        // })
                        user = {
                            status:'200',
                            result:hasJsonResult.SUCCESS,
                            message:'user successfully logged in',
                            code:'user_successfully_logged_in', 
                            payload:req.session.user.id,
                            cause: undefined ,   
                        }
                        return user;
                    }
                }
            )
            //(req, res, next);

            // const data = await response.json()
            // console.log(data)
            // return data;
            // }
            // return user;
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


const loginService = new LoginService(LoginModel, userDao, isValidPassword)
export default loginService



// passport.authenticate('login', 
// (err, user, info) => {
//     if (err)  return next(err);
//     if (!user) {
//         return {  
//             status: 500,
//             result: hasJsonResult.ERROR,
//             message:'user not logged in',
//             code:'user_not_logged_in',
//             payload:{data:res.locals.error_message.map( err =>      {
//                 return {    message : err,
//                             parameter : undefined,
//                             value : undefined
//                         }})},
//             cause: undefined ,
//             }
//     } else {

//         return {
            
//             status: 201,
//             result: hasJsonResult.SUCCESS,
//             message:'user not logged in',
//             code:'user_not_logged_in',
//             payload:{data: { username: user.username,name:user.name,id: user._id, role: user.role } },
//             cause: undefined ,                        
//         }
//     }
// })(req, res, next);