import { Router } from 'express';
import productRoutes from '../modules/product/product.routes';

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'OK' }));

router.use('/products', productRoutes);

export default router;