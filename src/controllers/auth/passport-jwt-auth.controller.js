import loginService from '../../services/auth/passport-jwt.auth.js'


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
}

const loginController = new LoginController(loginService)
export default loginController
