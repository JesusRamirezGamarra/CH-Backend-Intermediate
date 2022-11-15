import passport from 'passport';
import LoginModel from '../models/login.model.js'
import { userDao } from '../daos/user/index.js'
import isValidPassword from '../utils/encript/string.encript.js'


class LoginService {
    #loginModel
    #userDao
    // #tokenGenerator
    #isValidPassword
    constructor(loginModel, userDao, isValidPassword) {
        this.#loginModel = loginModel
        this.#userDao = userDao
        this.#isValidPassword = isValidPassword
    }

    passportLogin = async (req,res, next) =>{


        const  data =  passport.authenticate(
            'login',
            (err, user, info) => {
                if (err)  return next(err);
                if (!user) {
                    req.flash('error_message',info.message)
                    res.status(500).send(
                        { 
                            status:"error",
                            message:"user not logged in",
                            payload:{
                                data:res.locals.error_message.map( err => {
                                    return {
                                        message : err,
                                        parameter : undefined,
                                        value : undefined
                                    }})
                                }
                        }   
                    )
                } else {
                    req.session.authenticated = true;
                    req.session.user = {username: user.username,name:user.name,id: user._id,role: user.role}
                    return {status:"success",payload:req.session.user.id,message:"user successfully logged in"}
                    // req.session.user = {username: user.username,name:user.name,id: user._id}
                    // res.status(200).send({status:"success",payload:req.session.user.id,message:"user successfully logged in"})
                }
            }
        )(req, res, next);
        console.log(req.session.user)
        console.log(data)
        return {data:'ok'}
    }
    // tokenLogin = async (req) => {
    //     try {
    //         const loginModel = new this.#loginModel(req.body)
    //         const loginDto = loginModel.dto
    //         const user = await this.#usersDao.getByEmail(loginDto.email)
    //         const login = await this.#isValidPassword(loginDto.password, user.password)
    //         if (!login) {
    //             throw {
    //             message: 'Invalid password.',
    //             code: 'invalid_password',
    //             status: 400,
    //             expected: true,
    //             }
    //         }
    //         const token = this.#tokenGenerator(user)
    //         return { id: user.id, username: user.email, token }
    //         } 
    //     catch (err) {
    //         if (!err.expected)
    //         err = {
    //             message: 'Error logging in.',
    //             code: 'login_error',
    //             status: 500,
    //             }
    //         delete err.expected
    //         throw err
    //     }
    // }
}


const loginService = new LoginService(LoginModel, userDao, isValidPassword)
export default loginService
