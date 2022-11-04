import mongoose from 'mongoose';

const collection = "Users";

const schema = new mongoose.Schema({
    // name:String,
    // email:String,
    // password:String,

    name: {
        type: String, 
        required: false
    },    
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password:{ 
        type: String, 
        required: true
    },
    role:{
        type:String,
        enum: ['user','admin'],
        default:'user'
    }
})

const usersModel = mongoose.model(collection,schema);
export default usersModel;
