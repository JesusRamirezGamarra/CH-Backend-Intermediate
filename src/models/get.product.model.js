import {hasJsonResult} from '../config/config.js'

export default class GetProductModel {
    constructor(products) {
        this.products = products
    }
    get allProductsDto() {
        const products = this.products.map((product) => {
            const { name, description, thumbnail, price, stock, sku } = product
            return { sku, name, description, thumbnail, price, stock }
        })
        const jsonMessage = { result: hasJsonResult.SUCCESS, message:`getAll Product`, code:`getall_product`, payload:{data:products}, cause: undefined }
        // return JSON.parse(JSON.stringify(products))
        return JSON.parse(JSON.stringify(jsonMessage))
    }
    get oneProductDto() {
        const { name, description, thumbnail, price, stock, sku } = this.products
        const product = { sku, name, description, thumbnail, price, stock }
        const jsonMessage = { result: hasJsonResult.SUCCESS, message:` Product`, code:`product`, payload:{data:product}, cause: undefined }
        return JSON.parse(JSON.stringify(jsonMessage))
    }
}
