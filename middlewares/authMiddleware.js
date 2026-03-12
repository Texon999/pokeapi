import jwt from 'jsonwebtoken'



export const protect = (req, res, next) => {
  try {
    // PASO 1: leer el header Authorization
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {

      return res.status(401).json({ ok: false, message: 'Token requerido' })

    }

    // PASO 2: extraer el token
    const token = authHeader.split(' ')[1]
    // "Bearer eyJhbG..." → ["Bearer", "eyJhbG..."] → tomamos [1]

    // PASO 3: verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // PASO 4: adjuntar usuario al request
    req.user = decoded
    // ahora en cualquier controller puedes usar req.user.id

    next() // continúa al controller
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ ok: false, message: 'Token expirado' })
    }
    return res.status(401).json({ ok: false, message: 'Token inválido' })
  }
}