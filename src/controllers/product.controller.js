import productService from '../services/product.service.js'
// import userController from './user.controller.js';


class ProductController {
    #productService = productService
    constructor() {
        this.#productService = productService
    }
    create = async (req, res) => {
        try {
            const product = await this.#productService.create(req);
            res.status(201).json(product);     
        } catch (err) {
            res.status(err.status).json(err.err);
        }
    }
    getSearch = async (req, res) => {
        try {
            const products = await this.#productService.getSearch(req);
            // const products = await this.#productService.getAll();
            res.render("Home", { data: products.payload.data, user : req.session.user});
        } catch (err) {
            res.status(err.status).json(err.err);
        }
    }    
    getAll = async (req, res) => {
        try {
            const products = await this.#productService.getAll();
            // res.render("Home", { data: null, user : req.session.user});
            res.render("Home", { data: products.payload.data, user : req.session.user});
        } catch (err) {
            res.status(err.status).json(err.err);
        }
    }
    getById = async (req, res) => {
        try {
            const product = await this.#productService.getById(req);
            res.status(201).json(product);
        } catch (err) {
            res.status(err.status).json(err.err);
        }
    }
    updateById = async (req, res) => {
        try {
            const updatedProduct = await this.#productService.updateById(req);
            res.status(201).json(updatedProduct);
        } catch (err) {
            res.status(err.status).json(err.err);
        }
    }
    deleteById = async (req, res) => {
        try {
            await this.#productService.deleteById(req);
            res.status(204).json();
        } catch (err) {
            res.status(err.status).json(err.err);
        }
    }
}


const productController = new ProductController(productService);
export default productController;
