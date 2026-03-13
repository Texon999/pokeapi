import { Router } from "express";
import { createReservation,  getReservations  } from '../controller/reservationController.js'
import { protect } from '../middlewares/authMiddleware.js'



const router = Router()


router.use(protect) // todas las rutas de este router requieren autenticación



router.get( '/me', getReservations )
router.post('/', createReservation)



export default router











