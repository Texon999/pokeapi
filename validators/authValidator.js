import { z } from 'zod'; 

export const registerSchema = z.object({
user: z.string({

required_error: 'El nombre de usuario es necesario',
invalid_type_error: 'El nombre de usuario debe ser una cadena de texto'
}).min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
  .regex(/^[a-zA-Z0-9_]+$/, 'El nombre de usuario solo puede contener letras, números y guiones bajos'),

password: z.string({
    required_error: 'La contraseña es necesaria',
    invalid_type_error: 'La contraseña debe ser una cadena de texto'
}).max(10, 'La contraseña no puede tener más de 10 caracteres')



})




export const loginSchema = registerSchema;