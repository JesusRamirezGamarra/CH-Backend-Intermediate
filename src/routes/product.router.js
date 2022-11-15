import {Router} from 'express';
// import services from '../daos/index.js';
import __dirname from '../utils/directory/root.directory.js';
import isAdmin from '../middlewares/is.admin.js';
import productController from '../controllers/product.controller.js';


const router = Router();
// router.get('/',async(req,res)=>{
//     let products= await services.productService.getAll()
//     res.send(products)
// })
router.get('/',productController.getAll)
// router.get('/:pid',async(req,res)=>{
//     let number = req.params.pid
//     let data = await services.productService.getById(number)
//     console.log({data:data})
//     res.send({status:"success",data:data})
//     // res.send({status:"success", message:"Product Added"})
// })
router.get('/:id',isAdmin, productController.getById);

// router.post('/',isAdmin,async(req,res)=>{
//     let producto = req.body
//     await services.productService.save(producto)
        //     let products = await services.productService.getAll()
        //     let datos = JSON.parse(products)
        //     datos.push({cartID:req.session.user.cartID})
        //     global.io.emit('lista',datos)
//     res.send({status:"success", message:"Product Added"})
// })
router.post('/',isAdmin, productController.create)

// router.put('/',isAdmin,async(req,res)=>{
//     let product = req.body
//     await services.productService.update(product)
//     let products = await services.productService.getAll()
//     let datos = JSON.parse(products)
//     datos.push({cartID:req.session.user.cartID})
//     datos.io.emit('lista',datos)
//     res.send({status:"success", message:"Product Update"})
// })
// router.delete('/',isAdmin,async(req,res)=>{
//     let id = req.body
//     await services.productsService.deleteById(id.delete)
//     let products = await services.productService.getAll()
//     let datos = JSON.parse(products)
//     datos.io.emit('lista',datos)
//     res.send({status:"success", message:"Product Delete"})
// })




export default router;