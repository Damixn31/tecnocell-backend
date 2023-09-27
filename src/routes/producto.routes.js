import { Router } from 'express';
import { getProducto, createProducto, updateProducto, deteleProducto, getProductoById} from '../controllers/producto.controller.js';
const router = Router();

router.get('/productos', getProducto);

router.get('/producto/:id', getProductoById);

router.post('/producto', createProducto);

router.patch('/producto/:id', updateProducto);

router.delete('/producto/:id', deteleProducto);

export default router;

