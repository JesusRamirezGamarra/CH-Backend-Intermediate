import config from '../../config/config.js'


let cartDao
switch (config.PERSISTENCE) {
    case 'mongodb':
        const { default: CartDaoMongodb } = await import('./mongodb/cart.mongodb.dao.js')
        const { default: mongooseCartModel } = await import('./mongodb/cart.mongoose.model.js')
        cartDao = new CartDaoMongodb(mongooseCartModel)
    break
    default:
        throw {
            message: `Persistencia ${config.PERSISTENCE} no implementada.`,
            code: 'persistence_not_implemented',
            expected: true,
            status: 500,
        }
}


export { cartDao }
