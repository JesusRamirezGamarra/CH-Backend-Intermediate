import { check } from 'express-validator'
import validateResult  from '../utils/validateHelper.js'

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
        .isLength({min:3})
        .withMessage('password must be 3 caracters')
        .not()
        .isEmpty(),        
        // .custom((value,{req})=> {
        //     if (value < 18 || value > 40) {
        //         throw new Error ('Rango de edad debe ser entre 18 y 40')
        //     }
        //     return true
        // }),   
        (req,res,next)=>{
            validateResult(req,res,next);
        }
]

export default validateUserRegister;