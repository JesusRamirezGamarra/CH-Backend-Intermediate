// import loginService from '../services/token-login.service.js'
import loginService from '../services/passport-login.service.js'


class LoginController {
#loginService

constructor() {
    this.#loginService = loginService
    }

    tokenLogin = async (req, res) => {
        try {
            const login = await this.#loginService.tokenLogin(req)
            res.status(201).json(login)
        } catch (err) {
            res.status(err.status).json(err)
        }
    }
    localPassportLogin = async (req, res) =>{
        try{
            const login = await this.#loginService.passportLogin(req)
            res.status(201).json(login)
        }catch (err) {
            res.status(err.status).json(err)
        }
    }
}


const loginController = new LoginController(loginService)
export default loginController
