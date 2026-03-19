import * as reservationrepository from '../repositories/reservationRepository.js'
import { validate } from '../utils/validate.js'
import { createReservationSchema } from '../validators/reservationValidator.js'
import * as roomRepository from '../repositories/roomRepository.js'
import { calculateNights } from '../utils/calculateNights.js'

export const createReservation = async (data) => {
  const { id_usuario, id_sede, fecha_inicio, fecha_fin } = data
  

  
  validate(createReservationSchema, { id_sede, fecha_inicio, fecha_fin})

  const room = await roomRepository.findRoomsAvailable(id_sede, fecha_inicio, fecha_fin)
  if (!room) {
    throw { status: 400, message: 'No hay habitaciones disponibles para las fechas seleccionadas' }
  }


  const days = calculateNights(fecha_inicio, fecha_fin)
  const totalPrice = days * room.precio_noche








  return await reservationrepository.createReservation({
  id_usuario,
    id_sede,
    id_habitacion: room.id_habitacion,
    fecha_inicio,
    fecha_fin,
    precio: totalPrice

  })




}

export const getReservationsByUsuario = async (id_usuario) => {
  return await reservationrepository.findByUsuario(id_usuario)
}


export const getReservationsByDate = async (fecha_inicio, fecha_fin, id_usuario) => {
  if (!fecha_inicio || !fecha_fin) {
    throw { status: 400, message: 'Las fechas de inicio y fin son obligatorias' }
  }
  return await reservationrepository.findReservationBydate(fecha_inicio, fecha_fin, id_usuario)
}


export const getReservationsByStatus = async (status, id_usuario) => {
  if (!status) {
    throw { status: 400, message: 'El estado es obligatorio' }
  }
  return await reservationrepository.findReservationBystatus(status, id_usuario)
}


export const updateReservation = async (id, data) => {
  const reservation = await reservationrepository.findReservationById(id)
  if (!reservation) {
    throw { status: 404, message: 'Reserva no encontrada' }
  }
  return await reservationrepository.updateReservation(id, data)
}

export const updateReservationStatus = async (id, status) => {
  
  const reservation = await reservationrepository.findReservationById(id)
  if (!reservation) {
    throw { status: 404, message: 'Reserva no encontrada' }
  }
  return await reservationrepository.updateReservationStatus(id, status)
}


export const updatePriceReservation = async (id, precio) => {
  const reservation = await reservationrepository.findReservationById(id)
  if (!reservation) {
    throw { status: 404, message: 'Reserva no encontrada' }
  }
  return await reservationrepository.updatePriceReservation(id, precio)
}



export const deleteReservationCancelled = async (id) => {
    const eliminadas = await reservationrepository.deleteReservationCancelled(id)
   return { eliminadas }
}





