import config from '../config/config.js'


const isAdmin = (req, res, next) => {
    if ( !req.session  && req.session.user.role === 'admin' && req.session.user.username === config.CONTACT_EMAIL.ADMIN.EMAIL) next()
    else return res.redirect('/login')
}


export default isAdmin
