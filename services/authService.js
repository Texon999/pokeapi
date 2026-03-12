
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import * as userRepository from '../repositories/userRepository.js' 
import "dotenv/config"


export const register = async (user,password) =>{
if (!user || !password ) {
throw { status:400 , message: 'Se necesita usuario y contraseña '}
    
}
const userExists = await userRepository.userfind(user)

if (userExists) {
    throw { status:409 , message:'Este usuario ya esta registrado'   }
    
}
const hashedpassword = await bcrypt.hash(password, 10)

const userCreate = await userRepository.createUser(user, hashedpassword)

return userCreate;

}

// cuando ejecuto la funcion userexists y lo traigo, todos los datos referente a este se me traen, como la contrasenia o el id
//accedo al objeto y sus propiedades, por que en  el repository hice *

export const login = async(user, password)=>{ 

    if (!user || !password) {

        throw{ status:400 , message:'Falta usuario o contraseña'} 
    }

    const userExists = await userRepository.userfind(user)
    if (!userExists) {
    throw { status:401 , message:'Usuario o contraseña incorrectos'   }
    }
    const match = await bcrypt.compare(password, userExists.contrasena_usuario)
    if (!match) {
        throw { status:401, message:'Usuario o contraseña incorrectos' }
        
    }
    const token = jwt.sign( 

        { id: userExists.id_usuario , user: userExists.nombre_usuario },
        process.env.JWT_SECRET , 
        {expiresIn: process.env.JWT_EXPIRES_IN}
        
    )
    return { token, user: { id: userExists.id_usuario, user: userExists.nombre_usuario  } }
}


