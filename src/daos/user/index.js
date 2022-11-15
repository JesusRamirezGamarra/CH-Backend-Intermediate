import config from '../../config/config.js'


let userDao
switch (config.PERSISTENCE) {
    case 'mongodb':
        const { default: usersDaoMongodb } = await import('./mongodb/user.mongodb.dao.js')
        const { default: mongooseUserModel } = await import('./mongodb/user.mongoose.model.js')
        userDao = new usersDaoMongodb(mongooseUserModel)
    break
    default:
        throw {
            message: `Persistencia ${config.PERSISTENCE} no implementada.`,
            code: 'persistence_not_implemented',
            expected: true,
            status: 500,
        }
}

export { userDao }

