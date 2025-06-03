import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';
import path from 'path';
import viewsRouter from './routes/views.router.js';


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


app.use(express.static(path.resolve('public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve('./views'));




app.use('/', viewsRouter);


8
let products = [];


io.on('connection', socket => {
    console.log('Novo cliente conectado');


    socket.emit('productList', products);


    socket.on('newProduct', data => {
        products.push(data);
    });


    socket.on('deleteProduct', id => {
        products = products.filter(p => p.id !== id);
        io.emit('productList', products);
    });
});


const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});