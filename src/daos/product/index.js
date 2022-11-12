import config from '../../Config/config.js'


let productDao
switch (config.PERSISTENCE) {
    case 'mongodb':
        const { default: ProductsDaoMongodb } = await import('./mongodb/product.mongodb.dao.js')
        const { default: mongooseProductModel } = await import('./mongodb/product.mongoose.model.js')
        productDao = new ProductsDaoMongodb(mongooseProductModel)
    break
default:
    throw {
        message: `Persistence ${config.PERSISTENCE} not implemented`,
        code: 'persistence_not_implemented',
        expected: true,
        status: 500,
    }
}


export { productDao }
