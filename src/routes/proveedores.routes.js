import { Router } from 'express';

import {getProveedores, getProveedorId, createProveedor, deleteProveedor, updateProveedor} from '../controllers/proveedores.controller.js';

const router = Router();

router.get('/proveedores', getProveedores);

router.get('/proveedor/:id', getProveedorId);

router.post('/proveedor', createProveedor);

router.delete('/proveedor/:id', deleteProveedor)

router.patch('/proveedor/:id', updateProveedor)


export default router
