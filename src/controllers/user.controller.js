import userService from '../services/user.service.js'

class UserController {
    #userService
    constructor() {
        this.#userService = userService
    }

    create = async (req, res) => {
        try {
            const user = await this.#userService.create(req)
            res.status(201).json(user)
        } catch (err) {
            res.status(err.status).json(err.err)
        }
    }
    updateById = async (req, res) => {
        try {
            const updatedUser = await this.#userService.updateById(req);
            res.status(201).json(updatedUser);
        } catch (err) {
            res.status(err.status).json(err.err);
        }
    }
}


const userController = new UserController(userService)
export default userController
