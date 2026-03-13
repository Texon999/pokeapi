import * as reservationrepository from '../repositories/reservationRepository.js'

export const createReservation = async (data) => {
  const { id_usuario, id_sede, fecha_inicio, fecha_fin, precio } = data

  if (!id_usuario || !id_sede || !fecha_inicio || !fecha_fin || !precio) {
    throw { status: 400, message: 'Todos los campos son obligatorios' }
  }

  return await reservationrepository.createReservation(data)
}






export const getReservationsByUsuario = async (id_usuario) => {
  return await reservationrepository.findByUsuario(id_usuario)
}