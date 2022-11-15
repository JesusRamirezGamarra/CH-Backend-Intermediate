import productService from '../services/product.service.js'
import userController from './user.controller.js';


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
    getAll = async (req, res) => {
        try {
            const products = await this.#productService.getAll();
            // res.status(201).json(products);
            // res.render("Home", 
            //    [
            //         { name:  "Yehuda Katz"},
            //         { name:  "Alan Johnson"},
            //         { name:  "Charles Jolley"}                
            //     ]);
            
            let imageList = [];
                imageList.push({ src: "icons/flask.png", name: "flask" });
                imageList.push({ src: "icons/javascript.png", name: "javascript" });
                imageList.push({ src: "icons/react.png", name: "react" });
            let user = req.session.user;
            res.render("Home", { data: products.payload.data, user : user});

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
