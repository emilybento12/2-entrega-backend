import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Página Inicial' });
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { title: 'Produtos em tempo real' });
});

export default router;