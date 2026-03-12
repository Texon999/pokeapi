import { pool } from '../config/db.js'


export const findreservation =async ({ id_usuario, id_sede, fecha_inicio, fecha_fin, precio }) => {
    const [rows] = await pool.execute(
        "SELECT * FROM reserva WHERE id_usuario = ? AND id_sede = ? AND fecha_inicio = ? AND fecha_fin = ? AND precio = ?", 
        [id_usuario, id_sede, fecha_inicio, fecha_fin, precio]
    )
    return rows[0]
}

export const createReservation = async (data) => { 

    const { id_usuario, id_sede, fecha_inicio, fecha_fin, precio} = data

    const [result] = await pool.execute(
        "INSERT INTO reserva(id_usuario, id_sede, fecha_inicio, fecha_fin, precio) VALUES(?, ?, ?, ?, ?)", 
        [id_usuario, id_sede, fecha_inicio, fecha_fin, precio]
    )
return {
    id: result.insertId, 
    ...await findReservationById({ id_reserva: result.insertId })
}

}



