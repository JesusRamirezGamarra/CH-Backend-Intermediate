import loginService from '../../services/auth/passport-local.auth.js'


class LoginController {
#loginService

constructor() {
    this.#loginService = loginService
    }

    localPassportLogin = async (req, res) =>{
        try{
            const login = await this.#loginService.passportLogin(req)
            res.status(201).json(login)
        }catch (err) {
            res.status(err.status).json(err.err)
        }
    }
}


const loginController = new LoginController(loginService)
export default loginController
