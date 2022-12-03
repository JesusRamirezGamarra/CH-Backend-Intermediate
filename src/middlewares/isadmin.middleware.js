import config from '../config/config.js'

// req.session  && 
const isAdmin = (req, res, next) => {
    try{
        console.log(req.session.user )
        if (!req.session  && req.session.user.role === 'admin' && req.session.user.email === config.CONTACT_EMAIL.ADMIN.EMAIL) next()
        else { 
            console.log('ir  a login no eres ADMIN')
            return res.status(401 ).redirect('/login')
        }
    }
    catch(e){
        console.log(e)
        res.redirect('/login')
    }
}


export default isAdmin
