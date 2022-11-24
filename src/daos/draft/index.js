const persistence  = "MONGO";
let productService;
let cartService;
switch(persistence){
    case "MONGO":
        const {default:MongoCarts} = await import('./mongoDB/carts.js')
        const {default:MongoProducts} = await import('./mongoDB/products.js')        
        cartService = new MongoCarts()
        productService = new MongoProducts();        
        break;
}
const services = {
    cartService,
    productService
}


export default services
