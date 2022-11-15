import config,{hasJsonResult} from '../../config/config.js'


let ordersDao
switch (config.PERSISTENCE) {
    case 'mongodb':
        const { default: ordersDaoMongodb } = await import('./mongodb/order.mongodb.dao.js')
        const { default: mongooseOrderModel } = await import('./mongodb/order.mongoose.model.js')
        ordersDao = new ordersDaoMongodb(mongooseOrderModel)
    break
    default:
        throw {
            status: 500,
            expected: true,
            err: {
                result : hasJsonResult.ERROR,
                message: `Persistencia ${config.PERSISTENCE} no implementada.`,
                code: 'persistence_not_implemented',
                payload:{  data : undefined }, 
                cause: undefined,                
            }
        }
}


export { ordersDao }
