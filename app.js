import express from 'express' 
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'

const app = express() 
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json()); 






app.use('/api/auth',     authRoutes)
app.use('/api/reservas', reservationRoutes)


//app.use('/api/reservas', )
//app.use('/api/sedes',    )

//Despues tienen que estar protegias en las rutas, no olvidar
// agrega esto temporalmente
console.log('authRoutes cargado:', authRoutes)
console.log('reservationRoutes cargado:', reservationRoutes)

export default app




