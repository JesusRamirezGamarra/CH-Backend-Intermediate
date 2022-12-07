import config from '../config/config.js'

// req.session  && 
const isAdmin = (req, res, next) => {
    try{
        if (!req.session  && req.session.user.role === 'admin' && req.session.user.email === config.CONTACT_EMAIL.ADMIN.EMAIL) next()
        else { 
            return res.status(401 ).redirect('/login')
        }
    }
    catch(e){
        res.redirect('/login')
    }
}


export default isAdmin
