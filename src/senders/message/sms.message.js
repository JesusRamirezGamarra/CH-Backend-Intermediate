import twilio from "twilio";
import config from '../../config/config.js';


// const client = twilio('AC389f5ef1ebfae5e4997a3ae9513fab16','1c10dc517e925d7f7980a2c08038bb7f')

const client = twilio(config.MESSAGE.SMS.ACCOUNT_SID,config.MESSAGE.SMS.AUTH_TOKEN)


export const transporter = async(toNumber,message) =>{
    try
    {
        let result = await client.messages.create({
                // from:'+17432025424',
                // to:'+51978111558',
                // body:'test de prueba'
                from:config.MESSAGE.SMS.PHONE_NUMBER,
                to:toNumber,
                body:message
            })
    }
    catch(err)
    {
        console.log(err)
        throw {
            status: 500,
            result:hasJsonResult.ERROR,
            message: `server error`,
            code: 'server_error',
            payload:{  data : undefined }, 
            cause : err,            
            expected: true,
        }
        
    }
}

export default transporter
