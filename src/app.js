import express from 'express';

import productoRoutes from './routes/producto.routes.js';
import clientesRoutes from './routes/clientes.routes.js';
import provedoresRouter from './routes/proveedores.routes.js';
import indexRoutes from './routes/index.routes.js';


const app = express(); 

//cors
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next()
})

app.use(express.json());

app.use(indexRoutes)
app.use('/api', productoRoutes)
app.use('/api', clientesRoutes)
app.use('/api', provedoresRouter)

app.use((req, res, next) => {
  res.status(404).json({
    message: 'endpoint no funciona'
  })
})

export default app
