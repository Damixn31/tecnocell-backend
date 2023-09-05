import { Router } from 'express'

import {getClientes, getClienteId, createCliente, updateCliente, deleteCliente} from '../controllers/clientes.controller.js'

const router = Router();

router.get('/clientes', getClientes);

router.get('/cliente/:id', getClienteId);

router.post('/cliente', createCliente);

router.patch('/cliente/:id', updateCliente);

router.delete('/cliente/:id', deleteCliente);

export default router;
