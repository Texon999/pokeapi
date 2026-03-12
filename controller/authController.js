import * as authService from '../services/authService.js'

//data es el return de services

export const register = async (req, res) => {
  try {

    const { user, password } = req.body
    const data = await authService.register(user, password)

    res.status(201).json({ ok: true, data })

  } catch (error) {
    res.status(error.status ?? 500).json({ ok: false, message: error.message })
  }
}


export const login = async(req, res) =>{ 

try {

    const {user, password} = req.body 

    const data = await authService.login(user,password)
    res.status(200).json({ ok:true ,data  })

} catch (error) {
    res.status(error.status ?? 500).json({ ok:false, message:error.message})
}



}

















