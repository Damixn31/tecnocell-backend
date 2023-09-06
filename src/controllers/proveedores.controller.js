import { pool } from '../db.js'


export const getProveedores = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM proveedores')
    res.json(result)
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal'
    })
  }
}

export const getProveedorId = async (req, res) => {
  const id = req.params.id
  try {
    const [result] = await pool.query('SELECT * FROM proveedores WHERE id = ?', id)
    if(result.length <= 0) return res.status(404).json({
      mensage: 'proveedor no existe'
    })
    res.json(result[0])
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal'
    })
  }
}

export const createProveedor = async (req, res) => {
  const {nombre, apellido} = req.body;
  try {
    const [rows] = await pool.query('INSERT INTO proveedores (nombre, apellido) VALUES (?, ?)', [nombre, apellido])
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

export const deleteProveedor = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM proveedores WHERE id = ?', [req.params.id])
    if(result.affectedRows <= 0) return res.status(404).json({
      message: 'Proveedor no encontrado'
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal'
    })
  }
}

export const updateProveedor = async (req,res) => {
  const {id} = req.params;
  const {nombre, apellido} = req.body;
  try {
    const [result] = await pool.query('UPDATE proveedores SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido) WHERE id = ?', [nombre, apellido, id])
    if(result.affectedRows === 0) return res.status(404).json({
      message: 'Proveedor no exite'
    })
    
    const [rows] = await pool.query('SELECT * FROM proveedores WHERE id = ?', [id])
    res.json(rows[0]) 
  } catch (error) {
    return res.status(500).json({
      message: 'Algo salio mal'
    })
  }
}
