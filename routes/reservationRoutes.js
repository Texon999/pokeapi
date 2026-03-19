import { Router } from "express";
import { createReservation,  getReservations, getReservationsByDate,getReservationsByStatus, updateReservation, updateReservationStatus,updatePriceReservation, deleteReservationCancelled  } from '../controller/reservationController.js'
import { protect } from '../middlewares/authMiddleware.js'



const router = Router()


router.use(protect) // todas las rutas de este router requieren autenticación


router.get( '/me', getReservations )
router.post('/', createReservation)
router.get('/date', getReservationsByDate)
router.get('/status', getReservationsByStatus)
router.put('/:id', updateReservation)
router.patch('/:id/status', updateReservationStatus)
router.patch('/:id/precio', updatePriceReservation)
router.delete('/cancelled', deleteReservationCancelled)


export default router











