import mongoose from 'mongoose'
import config from '../config/config.js'


const connectOptions = {
    autoIndex:                  config.MONGO_DB.OPTIONS.AUTO_INDEX,                 //  false, // Don't build indexes
    maxPoolSize:                config.MONGO_DB.OPTIONS.MAX_POOL_SIZE,              //  10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS:   config.MONGO_DB.OPTIONS.SERVER_SELECTION_TIMEOUT,   // 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS:            config.MONGO_DB.OPTIONS.SOCKET_TIMEOUT_MS,          // Close sockets after 45 seconds of inactivity
    family:                     config.MONGO_DB.OPTIONS.FAMILY,                      // Use IPv4, skip trying IPv6
    keepAlive:                  config.MONGO_DB.OPTIONS.KEEP_ALIVE,                 // Keep
    useUnifiedTopology:         config.MONGO_DB.OPTIONS.USE_UNIFIED_TOPOLOGY   
    // userNewUrlParser:true,
}
export const initDB_Event =  () => {
    mongoose.connect(
        config.MONGO_DB.URL_CONNECT,
        connectOptions
    )
    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected',()=>{
        console.log(`🥋  ~  Mongoose is connected ! worker process with ${process.pid} started`)
    })
    // If the connection throws an error
    mongoose.connection.on('error', (err)=> { 
        console.log(`🥋  ~  Mongoose default connection error: ` + err);
    }); 
    // When the connection is disconnected
    mongoose.connection.on('disconnected',  () =>{ 
        console.log(`🥋  ~  Mongoose default connection disconnected`); 
    });
    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', ()=> {   
    mongoose.connection.close( ()=> { 
        console.log(`🥋  ~  Mongoose default connection disconnected through app termination`); 
        process.exit(0); 
        }); 
    }); 
}
export const initDB_Promise = async () => {
    return mongoose.connect(
        config.MONGO_DB.URL_CONNECT,
        connectOptions
    )
    .then((db)=> console.log(`🥋  ~  Mongoose is connected ! worker process with ${process.pid} started`))       
    .catch((err)=> console.error(`🥋  ~  Mongoose could not connect.`,err) )        
}
export const initDB_CallBack = () => {   
    return mongoose.connect(
        config.MONGO_DB.URL_CONNECT,
        connectOptions,
        (err) =>{
            if(err){
                console.log(`🥋  ~  Mongoose could not connect.`,err)         
            }else{
                console.log(`🥋  ~  Mongoose is connected ! worker process with ${process.pid} started` )
            }
        }
    )        
}
export const initDB_TryCatch = () => {
    try{
        return mongoose.connect(
            config.MONGO_DB.URL_CONNECT,
            connectOptions,
            () =>{
                console.log(`🥋  ~  Mongoose is connected ! worker process with ${process.pid} started` )
            }
        )        
    }
    catch(err){
        console.log(`🥋  ~  Mongoose could not connect.`,err)
    }
}
