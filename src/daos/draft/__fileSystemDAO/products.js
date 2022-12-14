import __dirname from '../../utils/pathDirectory.js'
import FileSystemContainer from "./fileSystemContainer.js";


export default class Products extends FileSystemContainer{
    constructor(){
        super()
        this.path = __dirname + '/files/products.json'
    }

    //generate a new product code
    codeGenerator = async () => {
        let data = await this.getAll()
        let new_code = ''
        do {
            new_code = (Math.random() + 1).toString(36).substring(7)
        } while (data.some(e => e.code === new_code))
        return new_code
    }

    //Add a new product
    addProduct = async (product) => {
        let data = await this.getAll()
        if (data.length === 0) {
            product.id = 1
            product.code = (Math.random() + 1).toString(36).substring(7) //create a random code
            product.enable = true
            product.time_stamp = Date.now().toLocaleString()
            this.save(product)
            return product.id
        } else {
            product.id = data[data.length - 1].id + 1
            product.code = await this.codeGenerator()
            product.time_stamp = Date.now().toLocaleString()
            product.enable = true
            this.save(product)
            return product.id
        }
        
    }
}