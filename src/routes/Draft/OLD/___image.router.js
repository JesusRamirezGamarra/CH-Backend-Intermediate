import { Router } from 'express'
import imageController from '../controllers/image.controller.js'
import uploadImg from '../middlewares/uploader.js'


const imageRouter = new Router()
imageRouter.post('/', uploadImg.single('image'), imageController.upload)


export default imageRouter
