import { Router } from 'express';
import { productController } from './product.controller';

const router = Router();

router.post('/', productController.create);
router.get('/', productController.list);
router.get('/:id', productController.findById);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove);

export default router;