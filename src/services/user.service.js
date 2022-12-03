import tokenGenerator from '../utils/generator/token.generator.js'
import idGenerator from '../utils/generator/id.generator.js'
import { makeEncryptPass } from '../utils/encript/string.encript.js'
import UserModel from '../models/user/user-login.model.js'
import UserProfileModel from '../models/user/user-profile.model.js';
import cartService from './cart.service.js'
import { userDao } from '../daos/user/index.js'
import {newUserEmailTemplate} from '../senders/email/template/newuser-template.email.js'
// import { body } from 'express-validator';
import {hasJsonResult} from '../Config/config.js'


class UserService {
    #userModel
    #userProfileModel
    #userDao
    #cartService
    #tokenGenerator
    #idGenerator
    #encryptPass
    constructor(UserModel, userProfileModel, userDao, cartService, tokenGenerator, idGenerator, encryptPass) {
        this.#userModel = UserModel
        this.#userProfileModel = userProfileModel
        this.#userDao = userDao
        this.#cartService = cartService
        this.#tokenGenerator = tokenGenerator
        this.#idGenerator = idGenerator
        this.#encryptPass = encryptPass
    }
    create = async (req) => {
        try {
            await this.#userExist(req.body.email)
            const userModel = new this.#userModel(this.#idGenerator, this.#encryptPass, req.body)
            const userDto = await userModel.dto()
            const newUser = await this.#userDao.create(userDto)
            if (!newUser)
                throw {
                    message: 'Error creating user.',
                    code: 'create_user_error',
                    status: 500,
                    expected: true,
                }

            const userCart = await this.#cartService.create(newUser.id)
            if (!userCart)
                throw {
                    message: 'Error creating user cart.',
                    code: 'create_cart_error',
                    status: 500,
                    expected: true,
                }
            const token = this.#tokenGenerator(newUser)
            return { id: newUser.id, username: newUser.email, token }

            // await this.#sendNotificationEmail(newUser)
        } 
        catch (err) {
            console.log({ err })
            if (!err.expected)
            err = {
                message: 'Error registering user.',
                code: 'register_error',
                status: 500,
            }
            delete err.expected
            throw err
        }
    }
    updateById = async (req) => {
        try {
            const currentUser = await this.#userDao.getById(req.session.user._id)
            if (!currentUser)
            throw {
                status: 404,
                expected: true,
                err: {
                    result:hasJsonResult.ERROR,
                    message: 'User not found.',
                    code: 'user_not_found',
                    payload:{  data : undefined }, 
                    cause: undefined ,    
                }
            }
            const userUpdate = {
                email:req.body.username,
                password: makeEncryptPass(req.body.password),
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                phone_number: req.body.phonenumber,
                image_url: req.body.imageurl,
                address: req.body.address,
                age: req.body.age,
            }
            const user =  await this.#userDao.updateById(currentUser._id, userUpdate)
            const userDto = new this.#userProfileModel(this.#encryptPass,user)
            return {
                status: 200,
                result:hasJsonResult.SUCCESS,
                message: 'User update sucessfully.',
                code: 'user_ update_sucessfully',
                payload:{  data : userDto }, 
                cause: undefined,
            }

        } 
        catch (err) {
            if (!err.expected)
            err = {
                status: 500,
                err: {
                    result:hasJsonResult.ERROR,
                    message: 'Error updating user.',
                    code: 'update_user_by_id_error',
                    payload:{  data : undefined }, 
                    cause: undefined ,                    
                }
            }
            delete err.expected
            throw err
        }
    }  
    #userExist = async (email) => {
        try {
            const user = await this.#userDao.getByEmail(email)
            if (user)
                throw {
                    message: 'Email already registered.',
                    code: 'email_already_registered',
                    status: 400,
                    expected: true,
                }
            return false
        } 
        catch (err) {
            throw err
        }
    }
    #sendNotificationEmail = async (newUser) => {
        try {
            const template = newUserEmailTemplate(newUser)
            await transporter.sendMail(template)
        } catch (error) {
            console.log({ error })
            if (!error.expected)
            error = {
                message: 'Error sending notification.',
                code: 'send_notification_error',
                status: 500,
            }

            delete error.expected
            throw error
        }
    }    


}
const userService = new UserService(
    UserModel,
    UserProfileModel,
    userDao,
    cartService,
    tokenGenerator,
    idGenerator,
    makeEncryptPass
)


export default userService
