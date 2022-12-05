import twilio from "twilio";
import config from '../../config/config.js';

const client = twilio(config.MESSAGE.WHATSAPP.ACCOUNT_SID,config.MESSAGE.WHATSAPP.AUTH_TOKEN)

export const transporterWhatsapp = async(toNumber,order) =>{
    try
    {
        const fullName = `${order.user.first_name} ${order.user.last_name}`
        const tituloinfo = `*New Order from ${fullName} have a buy*`
        const productsinfo = order.products
        .map((item) => {
            return `
*${item.product.name}*
_Price: ${item.product.price}_
_Cantidad: ${item.quantity}_
_SubTotal: ${item.product.price * item.quantity}_
${item.product.thumbnail}`
        })
        .join(' ')
        let total = 0;
        order.products.forEach( (item)=> total+= ( item.quantity * item.product.price) );     
        const totalinfo =`
*Order Id : ${order._id}*
Total: ${total}`

//         const messageInfoAccount = `_Detalles de la orden ${order._id}_
// <p style="margin: 0px;"><b>Nombre:</b> ${fullName}</p>
// <p style="margin: 0px;"><b>Correo:</b> ${order.user.email}</p>
// <p style="margin: 0px;"><b>Teléfono:</b> ${order.user.phone_number}</p>
// <p style="margin: 0px;"><b>Total:</b> ${total}</p>
// <p style="margin: 0px;"><b>Productos:</b></p>
// <ol>
//     ${products}
// </ol>`        
        
        let fromMessage ='whatsapp:'+config.MESSAGE.WHATSAPP.PHONE_NUMBER.trimEnd() ;
        let toMessage= 'whatsapp:'+toNumber.trimEnd();

        let result = await client.messages.create({
            from:fromMessage,
            to:toMessage,
            body:tituloinfo + totalinfo+ productsinfo,
            mediaUrl:['https://jesusramirez.pythonanywhere.com/static/img/Logo.jpg']
        })
        // console.log(result)

        // result = await client.messages.create({
        //     from:fromMessage,
        //     to:toMessage,
        //     body: messageInfoAccount
        // })
        // console.log(result)




        


    }
    catch(err)
    {
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

export default client
