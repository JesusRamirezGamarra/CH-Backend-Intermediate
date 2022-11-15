import __dirname from '../../utils/pathDirectory.js'
import FileSystemContainer from "./fileSystemContainer.js";


export default class Users extends FileSystemContainer{
    constructor(){
        super()
        this.path = __dirname + '/files/users.json'
    }
    changeStatus = async (uid, value) => {
        let data = await this.getAll()
        data = data.map((element)=>{
            if(element.id === uid){
                element.status = value
            }
        })
    }
}