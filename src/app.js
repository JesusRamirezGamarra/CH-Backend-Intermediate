import cluster from 'cluster'
import os from 'os'
import { createServer } from 'http'
import { Server } from "socket.io";
import config from './config/config.js';
import app from './services/server.js';
import { initDB_Event } from './services/db.js'



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
        const server = createServer(app);
        const io = new Server(server, { cors: { origin: "*" } });
        global.io = io;
        // app.use((req, res, next) => {
        //     req.io = io;
        //     return next();
        // });
        server.listen(config.INIT.PORT, () => {
            console.log(`🎁  ~  Servidor escuchando en el puerto ${config.INIT.PORT} - worker process with ${process.pid} started , ready : http://localhost:${config.INIT.PORT}/`);
        });
        server.on('error', (error) => console.log(`Error en servidor: ${error}`));
        



    }
    init()
}
// export default io;