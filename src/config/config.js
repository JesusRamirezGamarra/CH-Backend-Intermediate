import dotenv from 'dotenv';
import minimist from "minimist";

const {
    MODE,
    PORT,
    MODO,
    _
}= minimist(process.argv.slice(2),
            {
                alias:{e:"MODE",p:"PORT",m:"MODO"},
                default:{e:'DEV',p:8085,m:"FORK"}
            }
)
dotenv.config({
    path:MODE==="PROD"?'./.env.production':'./.env.development'
});
export const hasJsonMessage = {
    SUCCESS:'success',
    ERROR:'error'
}
export default {
    INIT:{
        MODE:   process.env.MODE||MODE||'DEV',
        PORT:   process.env.PORT||PORT||'8080',
        MODO:   process.env.MODO||MODO||'FORK',        
        DEBUG:   process.env.DEBUG||'true'        
    },
    APP:{
        DOMAIN: process.env.DOMAIN
    },
    SESSION:{
        USER:       process.env.SESSION_USER||undefined,
        PASSWORD:   process.env.SESSION_PASSWORD||undefined,
        CLUSTER:    process.env.SESSION_CLUSTER||undefined,
        DATABASE:   process.env.SESSION_DATABASE||undefined,
        OPTIONS:    process.env.SESSION_OPTIONS||undefined,
        URL_CONNECT:  `mongodb+srv://${process.env.SESSION_USER}:${process.env.SESSION_PASSWORD}@${process.env.SESSION_CLUSTER}/${process.env.SESSION_DATABASE}?${process.env.SESSION_OPTIONS}`,
        OPTIONS:  {
            USE_NEW_URL_PARSER:             true,            
            USE_UNIFIED_TOPOLOGY:           true,
            SERVER_SELECTION_TIMEOUT:       5000,
            AUTO_INDEX:                     false,
            MAX_POOL_SIZE:                  10,
            SOCKET_TIMEOUT_MS:              45000,    
            FAMILY :                        4,
            KEEP_ALIVE:                     true,
            USE_UNIFIED_TOPOLOGY:           true
        },
        SECRET:     process.env.SESSION_SECRET||undefined
    },   
    MONGO_DB:{
        USER:       process.env.MONGODB_USER||undefined,
        PASSWORD:   process.env.MONGODB_PASSWORD||undefined,
        CLUSTER:    process.env.MONGODB_CLUSTER||undefined,
        DATABASE:   process.env.MONGODB_DATABASE||undefined,
        OPTIONS:    process.env.MONGODB_OPTIONS||undefined,
        URL_CONNECT:  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?${process.env.MONGODB_OPTIONS}`,
        OPTIONS:  {
            USE_NEW_URL_PARSER:             true,            
            USE_UNIFIED_TOPOLOGY:           true,
            SERVER_SELECTION_TIMEOUT:       5000,
            AUTO_INDEX:                     false,
            MAX_POOL_SIZE:                  10,
            SOCKET_TIMEOUT_MS:              45000,    
            FAMILY :                        4,
            KEEP_ALIVE:                     true,
            USE_UNIFIED_TOPOLOGY:           true
        }
    },
    JWT:{
        SECRET:     process.env.JWT_SECRET,
        COOKIE:     process.env.JWT_COOKIE
    },
    NODEMAILER:{
        SERVICE:    process.env.NODEMAILER_SERVICE,
        HOST:       process.env.NODEMAILER_HOST,
        PORT:       process.env.NODEMAILER_PORT,
        USER:       process.env.NODEMAILER_USER,
        PASSWORD:   process.env.NODEMAILER_PASSWORD
    },
    GOOGLE:{
        CLIENT_ID:      process.env.GOOGLE_CID,
        CLIENT_SECRET:  process.env.GOOGLE_CSECRET
    },
    GMAIL:{
        PORT:       process.env.PORT,
        AUTH:{
            USER:       process.env.GMAIL_USER,
            PASSWORD:   process.env.GMAIL_PASSWORD
        }
    },
    CONTACT_EMAIL:{
        SAC:{
            EMAIL:  process.env.SAC_CONTACT_EMAIL,
            ALIAS:  process.env.SAC_CONTACT_EMAIL_ALIAS

        },
        ADMIN:{
            EMAIL:  process.env.ADMIN_CONTACT_EMAIL,            
            ALIAS:  process.env.ADMIN_CONTACT_EMAIL_ALIAS            
        }
    },
    TOKEN_EXP_TIME:     process.env.TOKEN_EXP_TIME,
    PERSISTENCE:        process.env.PERSISTENCE,
}