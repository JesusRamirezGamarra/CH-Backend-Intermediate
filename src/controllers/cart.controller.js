import cartService from '../services/cart.service.js'
import config, {hasJsonResult} from '../config/config.js'

class CartController {
    #cartService
    constructor(cartService) {
        this.#cartService = cartService
    }

    // create = async (req, res) => {
    //     try {
    //         //const cart = await this.#cartService.create(req)
    //         res.status(201).json(cart)
    //     } catch (err) {
    //         res.status(err.status).json(err)
    //     }
    // }
    getProducts = async (req, res) => {
        try {
            const cart = await this.#cartService.getProducts(req)
            res.status(201).render('checkout',{ products : cart  , user: req.session.user }) ;
            //res.status(201).json(cart)
        } catch (err) {
            res.status(err.status).json(err)
        }
    }
    addProduct = async (req, res) => {
        try {
            const updatedProduct = await this.#cartService.addProduct(req)
            res.status(201).send(updatedProduct)
        } catch (err) {
            res.status(err.status).json(err.err)
        }
    }    
    // addProduct = async (req, res) => {
    //     try {
    //         const updatedProduct = await this.#cartService.addProduct(req)
    //         res.status(201).json(updatedProduct)
    //     } catch (err) {
    //         res.status(err.status).json(err)
    //     }
    // }
    deleteProduct = async (req, res) => {
        try {
            const cart = await this.#cartService.deleteProduct(req)
            res.status(201).render('checkout',{ products : cart  , user: req.session.user }) ;
            //res.status(204).json()

        } catch (err) {
            res.status(err.status).json(err)
        }
    }
}


const cartController = new CartController(cartService)
export default cartController
