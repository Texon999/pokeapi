import { pool } from '../config/db.js'




export const findReservationById = async (id) => {

    const [rows] = await pool.execute(
        "SELECT * FROM reserva WHERE id_reserva = ?",
        [id]
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
    ...await findReservationById(result.insertId)
}

}



