import config from '../config/config.js'

const isAdmin = (req, res, next) => {
    if (req.session.user.username == config.CONTACT_EMAIL.ADMIN.EMAIL) next()
    else
    res.status(401).json({
        message: 'User not authorized to perform this operation.',
        code: 'not_authorized',
        status: 401,
    })
}


export default isAdmin
