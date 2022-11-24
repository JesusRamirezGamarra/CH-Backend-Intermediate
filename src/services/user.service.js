import tokenGenerator from '../utils/generator/token.generator.js'
import idGenerator from '../utils/generator/id.generator.js'
import {makeEncryptPass} from '../utils/encript/string.encript.js'
import UserModel from '../models/user.model.js'
import cartService from './cart.service.js'
import { userDao } from '../daos/user/index.js'
import {newUserEmailTemplate} from '../senders/email/template/newuser-template.email.js'


class UserService {
    #userModel
    #userDao
    #cartService
    #tokenGenerator
    #idGenerator
    #encryptPass
    constructor(UserModel, userDao, cartService, tokenGenerator, idGenerator, encryptPass) {
        this.#userModel = UserModel
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
    userDao,
    cartService,
    tokenGenerator,
    idGenerator,
    makeEncryptPass
)


export default userService
