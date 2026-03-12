
import "dotenv/config"

import mysql from "mysql2/promise"


export const pool = mysql.createPool({

    user: process.env.DB_USER , 
    host: process.env.DB_HOST ,
    password: process.env.DB_PASSWORD , 
    database: process.env.DB_NAME
}) 


export const connectDB = async() =>{

    try {
        
        const connection = await pool.getConnection() 
        console.log('Base de datos costa azul conectada correctamente')
        connection.release
    } catch (error) {
        console.log('Error conectando base de datos costa azul' , error)  
    }
}