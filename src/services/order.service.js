import OrderModel from '../models/order/order.model.js'
import { cartDao } from '../daos/cart/index.js'
import { ordersDao } from '../daos/order/index.js'
import { transporter } from '../senders/email/gmail.js'
import { newOrderEmailTemplate } from '../senders/email/templates/new-order-email-template.js'
import idGenerator from '../Utils/id-generator.js'

class OrderService {
    #orderModel
    #cartDao
    #ordersDao
    #idGenerator
    constructor(orderModel, cartDao, ordersDao, idGenerator) {
        this.#orderModel = orderModel
        this.#cartDao = cartDao
        this.#ordersDao = ordersDao
        this.#idGenerator = idGenerator
    }

    create = async (req) => {
        try {
            const userId = req.user.id
            const userCart = await this.#cartDao.getById(userId)
            const orderModel = new this.#orderModel(this.#idGenerator, req.user, userCart.products)
            const orderDto = orderModel.dto
            console.log({ orderDto })
            const newOrder = await this.#ordersDao.create(orderDto)
            if (!newOrder)
                throw {
                message: 'Error creating order.',
                code: 'create_order_error',
                status: 500,
                expected: true,
                }
            await this.#cartDao.deleteAllProducts(userId)
            await this.#sendNotificationEmail(orderDto)
            return newOrder
        } 
        catch (error) {
            console.log({ error })
            if (!error.expected)
                error = {
                message: 'Error creating order.',
                code: 'create_order_error',
                status: 500,
                }

            delete error.expected
            throw error
        }
    }
    getAll = async (req) => {
        try {
            console.log('req', req.user)
            return await this.#ordersDao.getAll(req.user.id)
        } 
        catch (error) {
            console.log({ error })
            if (!error.expected)
                error = {
                message: 'Failed to get all products.',
                code: 'get_all_products_error',
                status: 500,
                }
            delete error.expected
            throw error
        }
    }
    #sendNotificationEmail = async (order) => {
        try {
            const template = newOrderEmailTemplate(order)
            await transporter.sendMail(template)
        } 
        catch (error) {
            console.log({ error })
            if (!error.expected)
                error = {
                message: 'Error sending notification.',
                code: 'send_notification_error',
                status: 500,
                }
            delete error.expected
            throw error
        }
    }
}


const orderService = new OrderService(OrderModel, cartDao, ordersDao, idGenerator)
export default orderService
