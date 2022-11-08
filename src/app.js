import config from './config/config.js';
import Server from './services/server.js';
import { initDB_Event } from './services/db.js'
import cluster from 'cluster'
import os from 'os'


const numCPUs = os.cpus().length;


if(config.init.MODO === 'CLUSTER' && cluster.isPrimary){
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
        const server = Server.listen(config.init.PORT, () => {
            console.log(`🎁  ~  Servidor escuchando en el puerto ${config.init.PORT} - worker process with ${process.pid} started , ready : http://localhost:${config.init.PORT}/`);
        });
        server.on('error', (error) => console.log(`Error en servidor: ${error}`));
    }
    init()
}
















/***********************************************************************************************************


const app = express();
const PORT = process.env.PORT||8080;
// const connection = mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PASSWORD}@codercluster.w5adegs.mongodb.net/${config.mongo.DATABASE}?retryWrites=true&w=majority`)

app.use(express.json());

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

// app.use('/',viewsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))


**********************************************************************************************************/