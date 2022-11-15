import cluster from 'cluster'
import os from 'os'
// import { createServer } from 'http'
// import { Server } from "socket.io";
import config from './config/config.js';
import app from './services/server.service.js';
import { initDB_Event } from './services/connectDB.js'

import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'


const numCPUs = os.cpus().length;
if(config.INIT.MODO === 'CLUSTER' && cluster.isPrimary){
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died at ${Date()}`);
        cluster.fork();
    });
}
else {
    const init = async () => {
        initDB_Event()
        const httpServer = HttpServer(app);
        const io = new IOServer(httpServer, { cors: { origin: "*" } });
        global.io = io;
        // app.use((req, res, next) => {
        //     req.io = io;
        //     return next();
        // });
        const server = httpServer.listen(config.INIT.PORT, () => {
            console.log(`🎁  ~  Server listening on port  ${server.address().port} - worker process with ${process.pid} started , ready : http://localhost:${server.address().port}/`);
        });
        server.on('error', (error) => console.log(`Error en servidor: ${error}`));
    }
    init()
}