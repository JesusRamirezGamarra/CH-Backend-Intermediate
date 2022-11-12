import { check } from 'express-validator'
import validateResult  from '../utils/validate-helper.js'

const validateUserRegister = [
    check('name')
        .exists()
        .not()
        .isEmpty(), 
    check('username')
        .exists()
        .isEmail(),
    check('password')
        .exists()
        .isLength({min:6})
        .withMessage('password must be 6 caracters')
        .not()
        .isEmpty(),       
    check('repassword')
        .custom((value,{req})=> {
            if (value != req.body.password) {
                throw new Error ('Password confirmation does not match password')
            }
            return true
        }),   
        (req,res,next)=>{
            validateResult(req,res,next);
        }
]

export default validateUserRegister;