//----------* IMPORTS *----------//
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const tokenGenerator = ({ id, email, first_name, last_name, phone, image }) => {
    return jwt.sign(
        { id, email, first_name, last_name, phone, image }, 
        config.JWT.SECRET, {
            expiresIn:  config.TOKEN_EXP_TIME,
        }
    )
}

//----------* EXPORT FUNCTION *----------//
export default tokenGenerator
