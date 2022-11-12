// import { createTransport } from 'nodemailer';
import nodemailer from 'nodemailer'
import config from '../../config/config.js';


export const transporter = nodemailer.createTransport({
    service: config.NODEMAILER.SERVICE,     //'gmail',
    host: config.NODEMAILER.HOST,           // 'smtp.gmail.com',
    port: config.NODEMAILER.PORT || 587,
    auth: {
        user: config.NODEMAILER.USER,
        pass: config.NODEMAILER.PASSWORD,
    }
})

export default transporter
// user: config.GMAIL.AUTH.USER,
// pass: config.GMAIL.AUTH.PASSWORD,