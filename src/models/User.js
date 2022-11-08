import mongoose from 'mongoose';

const collection = "Users";

const usersSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: false
    },    
    username: {
        type: String, 
        required: true, 
        trim:true,
        lowercase :true,
        index: {
            unique: true
        }
        // // unique: true
    },
    password:{ 
        type: String, 
        required: [true,'password must have more than 2 characters']
    },
    role:{
        type:String,
        enum: ['user','admin'],
        default:'user'
    }
})

// var options = {
//     errorMessages: {
//         UserExistsError: 'Email already exists',
//         IncorrectUsernameError: 'Email does not exist'

//     }
// };


// const userService =  mongoose.model(  collection,usersSchema,options=options);
const userService =  mongoose.model(  collection,usersSchema);


export default userService;