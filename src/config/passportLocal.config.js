import passport from "passport";
import local from 'passport-local';
import userService from "../models/User.js";
import { makeEncryptPass, isValidPassword } from "../utils/cripto.js";
// import flash from 'connect-flash'

const LocalStrategy = local.Strategy;


const initializePassport = () =>{
    passport.use(
        'register',
        new LocalStrategy({usernameField: "username",passReqToCallback: true},
            async(req,email,password,done)=>{
                try{
                    const {name} = req.body;
                    if(!name||!email||!password) return done(null, false, req.flash('error_message','Incomplete values'));
                    const exists = await userService.findOne({username:email});
                    if(exists) return done(null, false, req.flash('error_message','Email already exists'));
                    const newUser = {name:name,username:email,password:makeEncryptPass(password)}
                    let result = await userService.create(newUser);
                    return done(null,result)
                }catch(err){
                    return done(null, false, req.flash('error_message',err.message));
                }
            }
        )
    )
    passport.use(
        'login',
        new LocalStrategy({usernameField:'username' },  
            async(email,password,done)=>{
                if(!email||!password) return done(null,false,{status:"error",message:"Incomplete values"})
                let user = await userService.findOne({username:email});
                if(!user) return done(null,false,{status:"error",message:"Incorrect credentials"})
                if(!isValidPassword(password,user.password)) 
                    return done(null,false,{status:"error",message:"Incorrect password"});
                return done(null,user);
            }
        )
    )
    passport.serializeUser((user,done)=>{  done(null,user._id)})
    passport.deserializeUser(async(id,done)=>{
        // userService.findOne({_id:id},()=> done(null,result) )
        let result = await userService.findOne({_id:id})
        return done(null,result);
    })
}

export default initializePassport;