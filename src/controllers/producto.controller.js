import { pool } from '../db.js';

export const getProducto = async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM producto')
      res.json(rows)
    } catch (error) {
      return res.status(500).json({
      message: 'Algo salio mal'
    })
  }
}

export const getProductoById = async (req, res) => {
  
  try {
  const [rows] = await pool.query('SELECT * FROM producto WHERE id = ?', [req.params.id])

  if (rows.length <= 0) return res.status(404).json({
    message: 'Producto no existe'
  })
  console.log(rows)
  res.send(rows[0])
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal'
    })
  }
}


export const createProducto = async (req, res) => {
  const {nombre,imei, precio, fecha} = req.body

    try {
      const [rows] = await pool.query('INSERT INTO producto (nombre, imei, precio, fecha) VALUES (?, ?, ?, ?)', [nombre, imei, precio, fecha])
      res.send({ 
        id: rows.insertId,
        nombre,
        imei,
        precio,
        fecha,
      })
    } catch (error) {
      return res.status(500).json({
      message: 'Algo salio mal'
    })
  }
}

export const deteleProdcuto = async (req, res) => {
    try {
  const [result] = await pool.query('DELETE FROM producto WHERE id = ?', [req.params.id])


  if (result.affectedRows <= 0) return res.status(404).json({
    message: 'Producto no encontrado'
  })

  res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal'
    })
  }
}

export const updateProducto = async (req, res) => {
    const {id} = req.params
    const {nombre, imei, precio, fecha} = req.body
 
    try {
     const [result] = await pool.query('UPDATE producto SET nombre = IFNULL(?, nombre), imei = IFNULL(?, imei), precio = IFNULL(?, precio), fecha = IFNULL(?, fecha) WHERE id = ?', [nombre, imei, precio, fecha, id])

      if(result.affectedRows === 0) return res.status(404).json({
      message: "Producto no encontrado"
  })

     const [rows] = await pool.query('SELECT * FROM producto WHERE id = ?', [id])

     res.json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal'
    })
  }
}

