import loginModel from '../models/login-model.js'
import { usersDao } from '../daos/user/index.js'
import tokenGenerator from '../utils/token-generator.js'
import passChecker from '../Utils/pass-checker.js'

class LoginService {
    #loginModel
    #usersDao
    #tokenGenerator
    #passChecker
    constructor(loginModel, usersDao, tokenGenerator, passChecker) {
        this.#loginModel = loginModel
        this.#usersDao = usersDao
        this.#tokenGenerator = tokenGenerator
        this.#passChecker = passChecker
    }

    login = async (req) => {
        try {
            const loginModel = new this.#loginModel(req.body)
            const loginDto = loginModel.dto
            const user = await this.#usersDao.getByEmail(loginDto.email)
            const login = await this.#passChecker(loginDto.password, user.password)
            if (!login) {
                throw {
                message: 'Invalid password.',
                code: 'invalid_password',
                status: 400,
                expected: true,
                }
            }
            const token = this.#tokenGenerator(user)
            return { id: user.id, username: user.email, token }
            } 
        catch (error) {
            if (!error.expected)
                error = {
                message: 'Error logging in.',
                code: 'login_error',
                status: 500,
                }
            delete error.expected
            throw error
        }
    }
}

const loginService = new LoginService(loginModel, usersDao, tokenGenerator, passChecker)
export default loginService
