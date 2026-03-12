import express from 'express' 
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'


const app = express() 

app.use(express.json()); 


app.use(cors({ origin: 'http://localhost:5173' }))



app.use('/api/auth',     authRoutes)



//app.use('/api/reservas', )
//app.use('/api/sedes',    )

//Toca proteher esto despues de implementar el login, para que solo los usuarios autenticados puedan acceder a estas rutas


export default app




