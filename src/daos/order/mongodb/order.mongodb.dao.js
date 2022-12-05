class OrdersDaoMongodb {
    #mongooseOrderModel
    constructor(mongooseOrderModel) {
        this.#mongooseOrderModel = mongooseOrderModel
    }


    create = async (cart) => {
        try {
            // cart.products.forEach( (item)=> delete item.stock );
            
            return await this.#mongooseOrderModel.create(cart)
        } catch (err) {
            console.log({ err })
            throw err
        }
    }

    // create = async (order) => {
    //     try {
    //         return await this.#mongooseOrderModel.create(order)
    //     } catch (err) {
    //         console.log({ err })
    //         throw err
    //     }
    // }
    getAll = async (userId) => {
        try {
            console.log({ userId })
            return await this.#mongooseOrderModel.find({ userId })
        } catch (err) {
            console.log({ err })
            throw err
        }
    }
}


export default OrdersDaoMongodb
