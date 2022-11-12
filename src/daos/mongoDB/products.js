import mongoose from "mongoose";
import crypto from 'crypto';
import pino from "pino"
import MongoDBContainer from "./mongoDBContainer.js";
import __dirname from '../../utils/path-directory.js'


const streams = [{level:'info',stream:process.stdout},{level:'warn',stream:pino.destination(__dirname + '/warn.log')},{level:'error',stream:pino.destination(__dirname+'/error.log')}]
const logger = pino({},pino.multistream(streams))
const collections = 'products'
const productsSchema = mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    stock:Number,
    thumbnail:String,
    id:Number,
    code:String,
    timestamp:String
})


export default class Products extends MongoDBContainer{
    constructor(){
        super(collections,productsSchema)
    }
    save = async(product) =>{   
        try {
            let datenow = new Date();
            generateDatabaseDateTime = date => date.toISOString().replace("T"," ").substring(0, 19);
            
            if(await this.model.countDocuments() ===0){
                product.id= 1;
                product.code=crypto.randomUUID();
                product.timestamp= generateDatabaseDateTime(datenow);
                await this.model.create(product)
            }else{
                let id = await this.model.find({},{id:1,_id:0}).sort({id:-1}).limit(1)
                product.id = id[0].id+1
                product.code =crypto.randomUUID()
                product.timestamp= generateDatabaseDateTime(datenow);
                await this.model.create(product)
            }
        } catch (err) {
            logger.error(`Hay un error ${err}`)
            return `Hay un error:  ${err}`
        }
    }
    update = async(obj) =>{
        try{
            await this.model.updateOne({id:obj.id},{$set:{name:obj.name,description:obj.description,price:obj.price,stock:obj.stock,thumbnail:obj.thumbnail}})
            return 'Apdate OK';
        }catch(err){
            logger.error(`Hay un error ${err}`)
            return `Hay un error o se a mandaod un producto invalido`
        }
        
    }
}