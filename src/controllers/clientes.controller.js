import { pool } from '../db.js'

export const getClientes = async (req, res) => {
  try {
      const [result] = await pool.query('SELECT * FROM clientes')
      //console.log(result)
      res.json(result)
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal'
    })
  }
}

export const getClienteId = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM clientes WHERE id = ?', [req.params.id])

    if(result.length <= 0) return res.status(404).json({
      message: 'El cliente no existe'
    })
    res.json(result[0])
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal'
    })
  }
}


export const createCliente = async (req, res) => {

  const {nombre, apellido} = req.body;
  try {
    const [rows] = await pool.query('INSERT INTO clientes (nombre, apellido) VALUES (?, ?)', [nombre, apellido])
    res.send({
      id: rows.insertId,
      nombre,
      apellido
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal'
    })
  }
}

export const deleteCliente = async (req, res) => {

  try {
    const [result] = await pool.query('DELETE FROM clientes WHERE id = ?', [req.params.id])
    if(result.affectedRows <= 0) return res.status(404).json({
      message: 'Cliente no encontrado'
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal'
    })
  }

} 

export const updateCliente = async (req, res) => {
  const {id} = req.params;
  const {nombre, apellido} = req.body;

  try {
    const [result] = await pool.query('UPDATE clientes SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido) WHERE id = ?', [nombre, apellido, id]) 
    if(result.affectedRows === 0) return res.status(404).json({
      message: 'Cliente no encontrado'
    })

    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id])
    res.json(rows[0])

  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal'
    })
  }
}
