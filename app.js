import express from 'express' 
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import locationRoutes from './routes/locationRoutes.js'
import morgan from 'morgan'
const app = express() 
app.use(morgan("dev"));

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json()); 






app.use('/api/auth',     authRoutes)
app.use('/api/reservas', reservationRoutes)

app.use('/api/sedes',    locationRoutes)












//app.use('/api/reservas', )
//app.use('/api/sedes',    )

//Despues tienen que estar protegias en las rutas, no olvidar
export default app




