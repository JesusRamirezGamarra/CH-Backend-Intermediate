import Mongoose from "mongoose"
import pino from "pino";
import config from "../../config/config.js";
import __dirname from '../../utils/path-directory.js'


const streams = [{level:'info',stream:process.stdout},{level:'warn',stream:pino.destination(__dirname + '/warn.log')},{level:'error',stream:pino.destination(__dirname+'/error.log')}]
const logger = pino({},pino.multistream(streams))

export default class MongoDBContainer{
    constructor(collection,schema){
        Mongoose.connect(config.MONGO_DB.URL_CONNECT)
        this.model = Mongoose.model(collection,schema)
    }
    getAll = async() =>{
        try {
            let data = await this.model.find()
            return JSON.stringify(data)
        } catch (err) {
            logger.error(`Hay un error ${err}`)
            return `Hay un error:  ${err}`
        }
    }
    getById = async(idNumber) =>{
        try {
            const data = await this.getAll();
            if(data.id !=idNumber){
                let data = await this.model.find({id:{$eq:idNumber}}) 
                return JSON.stringify(data)
            }else{
                return "null"
            }
        } catch (err) {
            logger.error(`Hay un error ${err}`)
            return `Hay un error:  ${err}`
        }
    }
    deleteById = async(idDelete) =>{
        try {
            const data = await this.getAll()
            let result = await this.model.deleteOne({id:idDelete})            
        } catch (err) {
            logger.error(`Hay un error ${err}`)
            return `Hay un error:  ${err}`
        }        
    }
}