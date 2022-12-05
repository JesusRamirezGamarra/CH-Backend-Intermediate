//----------* IMPORTS *----------//
// import CartModel from '../Models/cart-model.js'
// import { cartDao } from '../Daos/carts/index.js'
// import { productsDao } from '../Daos/products/index.js'
//import orderModel from '../models/order/order.model.js'
import cartModel from '../models/cart/cart.model.js'
// import cartNewUserModel from '../models/cart/cart-newuser.model.js'
// import { orderDao } from '../daos/order/index.js'
import { cartDao } from '../daos/cart/index.js'
import { productDao } from '../daos/product/index.js'

import config, {hasJsonResult} from '../config/config.js'


class CartService {
    #cartModel
    // #orderDao
    #cartDao
    #productDao
    constructor(cartModel, cartDao, productDao) {
        this.#cartModel = cartModel
        // this.#cartNewUserModel = cartNewUserModel
        // this.#orderDao = orderDao
        this.#cartDao = cartDao
        this.#productDao = productDao
    }

    addProducts = async (req) => {
        try {
            // console.log(req.body)
            // console.log(req.session.user)
            let cartId = req.session.user.cart
            let product = req.body;
            // let cart = await this.#cartDao.getById(cartId);
            // cart.products.push( {product: product[0]._id, quantity: 2} )
            // cart.products.push( {product: product[1]._id, quantity: 1} )
            // await this.#cartDao.addProduct(cartId,cart);
            await this.#cartDao.deleteAllProducts(cartId);
            await this.#cartDao.addProducts(cartId,product);
            const cart = await this.#cartDao.getByIdPopulate(cartId);


            if (!cart)
            return {
                status: 404,
                result:hasJsonResult.ERROR,
                message: 'User cart does not exist.',
                code: 'user_cart_not_found',
                payload:{  data : undefined}, 
                cause: undefined,
            }

            let total = 0;
            cart.products.forEach( (item)=> total+= ( item.quantity * item.product.price) );

            return {
                status: 200,
                result:hasJsonResult.SUCCESS,
                message: 'creating new cart.',
                code: 'creating_new_product_in_cart',
                payload:{  
                    sessionId :req.session.user._id,
                    data : cart.products,
                    total : total,
                }, 
                cause: undefined,
            }
            
        } catch (err) {
            if (!err.expected)
            err = {
                status: 500,
                result:hasJsonResult.ERROR,
                message: 'Error adding product to cart.',
                code: 'add_product_to_cart_error',
                payload:{  data : undefined }, 
                cause: undefined,                
                expected: true,
            }
            delete err.expected
            throw err
        }
    }
    addProductsToOrder = async (req) => {
        try {
            let cartId = req.session.user.cart
            let product = req.body;
            await this.#cartDao.deleteAllProducts(cartId);
            await this.#cartDao.addProducts(cartId,product);
            const cart = await this.#cartDao.getByIdPopulate(cartId);
            // console.log(JSON.stringify( cart,null,'\t'))
            // console.log(cart.products[0].product.sku)
            if (!cart)
            return {
                status: 404,
                result:hasJsonResult.ERROR,
                message: 'User cart does not exist.',
                code: 'user_cart_not_found',
                payload:{  data : undefined}, 
                cause: undefined,
            }

            let total = 0;
            cart.products.forEach( (item)=> total+= ( item.quantity * item.product.price) );
            // await this.#orderDao.create(cart, req.session.user)

            return {
                status: 200,
                result:hasJsonResult.SUCCESS,
                message: 'creating new cart.',
                code: 'creating_new_product_in_cart',
                payload:{  
                    sessionId :req.session.user._id,
                    data : cart.products,
                    total : total,
                }, 
                cause: undefined,
            }
            
        } catch (err) {
            if (!err.expected)
            err = {
                status: 500,
                result:hasJsonResult.ERROR,
                message: 'Error adding product to cart.',
                code: 'add_product_to_cart_error',
                payload:{  data : undefined }, 
                cause: undefined,                
                expected: true,
            }
            delete err.expected
            throw err
        }
    }    
    create = async () => {
        try {
            // const newCart =  new this.#cartNewUserModel()
            return await this.#cartDao.create()
        } catch (err) {
            if (!err.expected)
            err = {
                status: 500,
                err: {
                    result:hasJsonResult.ERROR,
                    message: 'Error creating new cart.',
                    code: 'create_new_product_error',
                    payload:{  data : { thumbnail :  config.NOTFOUND_THUMBNAIL }}, 
                    cause: undefined,
                }
            }
            delete err.expected;
            throw err;
        }
    }
    getProducts = async (req) => {
        try {
            const cart = await this.#cartDao.getByIdPopulate(req.session.user.cart)
            if (!cart)
            throw {
                err: {
                    status: 404,
                    result:hasJsonResult.ERROR,
                    message: 'User cart does not exist.',
                    code: 'user_cart_not_found',
                    payload:{  data : undefined}, 
                    cause: undefined,
                }
            }
            let total = 0;
            cart.products.forEach( (item)=> total+= ( item.quantity * item.product.price) );
            return {
                status: 200,
                result:hasJsonResult.SUCCESS,
                message: 'creating new cart.',
                code: 'creating_new_product_in_cart',
                payload:{  
                    sessionId :req.session.user._id,
                    data : cart.products,
                    total : total,
                }, 
                cause: undefined,
            } 
        } catch (err) {
            if (!err.expected)
            err = {
                status: 500,
                result:hasJsonResult.ERROR,
                message: 'Failed to get all products.',
                code: 'get_all_products_error',
                payload:{  data : undefined}, 
                expected: true,
            }
            delete err.expected
            throw err
        }
    }
    deleteProduct = async (req) => {
        try {
            // const cart = await this.#cartDao.getByIdPopulate(req.session.user.cart)
            // if (!cart)
            // throw {
            //     status: 404,
            //     result:hasJsonResult.ERROR,
            //     message: 'User cart does not exist.',
            //     code: 'user_cart_not_found',
            //     payload:{  data : undefined}, 
            //     expected: true,
            // }
            await this.#cartDao.deleteProduct(req.session.user.cart,req.body.product);
            // return await this.#cartDao.deleteProduct(req.user.id, req.params.productId)
            return {
                status: 200,
                result:hasJsonResult.SUCCESS,
                message: 'remove product in cart',
                code: 'remove_product_in_cart',
                payload:{  
                    //sessionId :req.session.user.cart,
                    data : req.body.product                    
                }, 
                cause: undefined,
            } 
        } catch (err) {
            if (!err.expected)
            err = {
                status: 500,
                result:hasJsonResult.ERROR,
                message: 'Error removing product in cart.',
                code: 'delete_product_by_id_error_in_cart',
                payload:{  data : undefined}, 
                expected: true,
            }

            delete err.expected
            throw err
        }
    }

    // addProduct = async (req) => {
    //     try {
    //         const product = await this.#productDao.getById(req.body.productId)
    //         if (!product)
    //         throw {
    //             message: 'Product not found.',
    //             code: 'product_not_found',
    //             status: 404,
    //             expected: true,
    //         }
    //         return this.#cartDao.addProduct(req.user.id, product)
    //     } catch (err) {
    //         if (!err.expected)
    //         err = {
    //             message: 'Error adding product to cart.',
    //             code: 'add_product_to_cart_error',
    //             expected: true,
    //             status: 500,
    //         }

    //         delete err.expected
    //         throw err
    // }
    // }
    // deleteProduct = async (req) => {
    //     try {
    //         const cart = await this.#cartDao.getById(req.user.id)
    //         if (!cart)
    //         throw {
    //             message: 'User cart does not exist.',
    //             code: 'user_cart_not_found',
    //             status: 404,
    //             expected: true,
    //         }
    //         return await this.#cartDao.deleteProduct(req.user.id, req.params.productId)
    //     } catch (err) {
    //         if (!err.expected)
    //         err = {
    //             message: 'Error removing product.',
    //             code: 'delete_product_by_id_error',
    //             status: 500,
    //         }

    //         delete err.expected
    //         throw err
    //     }
    // }
}


// const cartService = new CartService(cartModel, orderDao, cartDao, productDao)
const cartService = new CartService(cartModel, cartDao, productDao)
export default cartService
