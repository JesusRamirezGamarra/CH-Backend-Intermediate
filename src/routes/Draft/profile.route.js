import  { Router } from 'express';
import moment from 'moment'
import { logger } from '../../utils/logger/isLogger.js';
import isAuthSession from '../../middlewares/isauth.middleware.js'


const router = Router();
router.get('/profile', isAuthSession, async(req, res) => {
    res.render('profile');
});

router.post('/profile', isAuthSession, async(req, res) => {
    
});


export default router;
