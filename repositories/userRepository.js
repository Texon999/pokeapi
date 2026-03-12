import { pool } from '../config/db.js'




export const userfind = async (user) =>{



    const [rows] = await pool.execute(
        

     "SELECT * FROM usuario WHERE nombre_usuario = ?   " , [user]

    )

    return rows[0]
}

export const createUser = async (user, hashedpassword) => { 



    const [result] = await pool.execute(
        "INSERT INTO usuario(nombre_usuario, contrasena_usuario ) VALUES(?, ?  )", [user, hashedpassword]
    )
return {
    id: result.insertId, 
    user
}


}


