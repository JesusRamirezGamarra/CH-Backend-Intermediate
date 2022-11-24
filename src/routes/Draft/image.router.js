import { Router } from 'express'
import imageController from '../Controllers/image-controller.js'
import uploadImg from '../middlewares/uploader.js'


const router = new Router()
router.post('/', uploadImg.single('image'), imageController.upload)


export default router
