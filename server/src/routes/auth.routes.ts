import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.model'
import jwt from 'jsonwebtoken'
// import isAuthenticated from '../middlewares/jwt.middleware'

const router = express.Router()

const saltRounds = 10

interface UserInterface {
  email: string
  name: string
  password: string
  surname: string
  birthday: string
  imageURL: string
  _id: string
}

type Payload = Omit<UserInterface, 'password' | 'imageURL'>

router.post('/register', (req: Request, res: Response) => {
  const { email, password, name, surname, imageURL, birthday } = req.body

  if (email === '' || password === '' || name === '' || surname === '') {
    res.status(400).json({ message: 'Se requiere email, contraseña, nombre de usuario y nombre completo' })
    return
  }

  if (password.length < 6) {
    res.status(400).json({ message: 'Tu contraseña debe tener al menos 3 caracteres' })
    return
  }

  User
    .findOne({ email })
    .then((foundUser) => {
      if (foundUser !== undefined) {
        res.status(401).json({ message: 'Usuari@ ya existente' })
        return
      }
      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = bcrypt.hashSync(password, salt)
      return User.create({ email, password: hashedPassword, name, surname, imageURL, birthday })
        .then((createdUser) => {
          const { email, name, password, surname, birthday, imageURL, _id } = createdUser
          const user: UserInterface = { email, name, password, surname, birthday, imageURL, _id }
          res.status(201).json({ user })
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ message: 'Error interno del servidor' })
        })
    })
    .catch(err => console.error(err))
})

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body

  if (email === '' || password === '') {
    res.status(400).json({ message: 'Introduce un correo y contraseña.' })
    return
  }

  User
    .findOne({ email })
    .then(foundUser => {
      if (foundUser === undefined) {
        res.status(401).json({ message: 'Usuario no encontrado.' })
      }
      if (bcrypt.compareSync(password, foundUser.password)) {
        const { email, name, surname, birthday, _id } = foundUser
        const payload: Payload = { email, name, surname, birthday, _id }
        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: '6h' }
        )
        res.status(200).json({ authToken })
      } else {
        res.status(401).json({ message: 'No se ha podido autenticar al usuari@' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Error interno del servidor' })
    })
})

// router.get('/verify', isAuthenticated, (req: Request, res: Response): void => {
//   res.status(200).json(req.payload)
// })

export default router
