import config from '../../config/config.js'


let cartDao
switch (config.PERSISTENCE) {
    case 'mongodb':
        const { default: CartDaoMongodb } = await import('./mongodb/cart.mongodb.dao.js');
        const { default: MongooseCartModel } = await import('./mongodb/cart.mongoose.model.js');
        cartDao = new CartDaoMongodb(MongooseCartModel);
    break;
    case 'filesystem':
        const { default: CartDaoFileSystem } = await import('./filesystem/cart.filesystem.dao.js');
        cartDao = new CartDaoFileSystem();
    break;
    case 'memory':
        const { default: CartDaoMemory } = await import('./memory/cart.memory.dao.js');
        cartDao = new CartDaoMemory();
    break;
    default:
        throw {
            message: `Persistencia ${config.PERSISTENCE} no implementada.`,
            code: 'persistence_not_implemented',
            expected: true,
            status: 500,
    }
}


export { cartDao }
