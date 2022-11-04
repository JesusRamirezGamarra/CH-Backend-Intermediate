import winston from 'winston'

    const logConfig = {
        level: 'info',
        format: winston.format.json(),
        //format: winston.format.simple(),
        transports: [
            new winston.transports.Console({ 
                level: 'info' 
            }),
            new winston.transports.File({
                            filename: './logs/warnings.log',
                            level: 'warn',
            }),
            new winston.transports.File({
                            filename: './logs/errors.log',
                            level: 'error',
            }),
        ],
    }

    
export const logger = winston.createLogger(logConfig);

