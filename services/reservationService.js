import * as reservationrepository from '../repositories/reservationRepository.js'




export const createReservation = async (id_usuario, id_sede, fecha_inicio, fecha_fin, precio) => { 


if (!id_usuario || !id_sede || !fecha_inicio || !fecha_fin || !precio) {
    throw { status:400, message:'Todos los campos son obligatorios' }
}


const reservationExist = await reservationrepository.findreservation({ id_usuario, id_sede, fecha_inicio, fecha_fin, precio })

if (reservationExist) { 

    throw{ status:409 , message:'Esta reserva ya existe'   }

} 



return await reservationrepository.createReservation({ id_usuario, id_sede, fecha_inicio, fecha_fin, precio })




} 




