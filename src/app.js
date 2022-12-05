import cluster from 'cluster'
import os from 'os'
import config from './config/config.js';
// import app from './server/express.server.js';
// import { initDB_Event } from './services/connectmongodb.js'


import Server from "./server/server.js";

// import { Server as HttpServer } from 'http'
// import { Server as IOServer } from 'socket.io'



const numCPUs = os.cpus().length;
if(config.INIT.IS_CLUSTER && cluster.isPrimary){
    logger.log('info', `Master ${process.pid} process is running`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker) => {
        // console.log(`Worker ${worker.process.pid} died at ${Date()}`);
        logger.log('info', `Worker ${worker.process.pid} died ${new Date().toLocaleString()}`);
        cluster.fork();
    });
}
else {
    const init = async () => {
        // initDB_Event()
        const server = new Server();
        server.listen();
    }
    init()
}