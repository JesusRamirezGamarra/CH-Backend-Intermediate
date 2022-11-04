import dotenv from 'dotenv';
import minimist from "minimist";

const MONGO_URL =''
const MONGODB_USER ='coderhouse'
const MONGODB_PASSWORD ='Mishina2000'
const MONGODB_CLUSTER ='coderhouse-cluster-ljrg.qaohzev.mongodb.net'
const MONGODB_DATABASE ='CoderHouse-eCommerce'
const MONGODB_OPTONS ='retryWrites=true&w=majority'

const {
    MODE,
    PORT,
    MODO,
    _
}= minimist(process.argv.slice(2),
            {
                alias:{e:"MODE",p:"PORT",m:"MODO"},
                default:{e:'DEV',p:8081,m:"FORK"}
            }
)
// console.log({MODE:MODE})
// console.log({PORT:PORT})

dotenv.config({
    path:MODE==="PROD"?'./.env.production':'./.env.development'
});



export default {
    init:{
        MODE:process.env.MODE||MODE||'DEV',
        PORT:process.env.PORT||PORT||'8080',
        MODO:process.env.MODO||MODO||'FORK',        
        // MODO:process.env.DEBUG||DEBUG||'true',        
    },
    app:{
        MODE:process.env.MODE||'DEV',
        DEBUG:process.env.DEBUG||false,
        // PORT:process.env.PORT||8080,        
    },
    mongo:{
        
        MONOG_USER:         process.env.MONGODB_USER||MONGODB_USER||'undifined',
        MONGODB_PASSWORD:   process.env.MONGODB_PASSWORD||MONGODB_PASSWORD||'undifined',
        MONGODB_CLUSTER:    process.env.MONGODB_CLUSTER||MONGODB_CLUSTER||'undifined',
        MONGODB_DATABASE:   process.env.MONGODB_DATABASE||MONGODB_DATABASE||'undifined',
        MONGODB_OPTONS:     process.env.MONGODB_OPTONS||MONGODB_OPTONS||'undifined',
        MONGO_URL:          `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/${MONGODB_DATABASE}?${MONGODB_OPTONS}`
        // process.env.MONGO_URL||MONGO_URL||'undifined',
        
    }
}




