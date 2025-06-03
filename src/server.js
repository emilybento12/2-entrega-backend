import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import viewsRouter from './routes/views.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const products = [];

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', viewsRouter);

io.on('connection', socket => {
  console.log('Novo cliente conectado');
  socket.emit('productList', products);

  socket.on('newProduct', data => {
    products.push(data);
    io.emit('productList', products);
  });

  socket.on('deleteProduct', id => {
    const index = products.findIndex(p => p.id == id);
    if (index !== -1) {
      products.splice(index, 1);
      io.emit('productList', products);
    }
  });
});

httpServer.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});