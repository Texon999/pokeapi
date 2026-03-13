import * as reservationService from '../services/reservationService.js' 


export const createReservation = async (req, res) => {
  try {
    const data = await reservationService.createReservation({
      ...req.body,             
      id_usuario: req.user.id   
    })
    res.status(201).json({ ok: true, data })
  } catch (error) {
    res.status(error.status ?? 500).json({ ok: false, message: error.message })
  }
}


export const getReservations = async (req, res) => {
try {
    
    const data = await reservationService.getReservationsByUsuario(req.user.id)

    res.status(200).json({ ok: true, data })



} catch (error) {
    res.status(error.status ?? 500).json({ ok: false, message: error.message })
}



}
















