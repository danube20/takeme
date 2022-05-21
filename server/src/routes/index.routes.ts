import express from 'express'
import authRoute from './auth.routes'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json({ message: 'It\'s working!' })
})

router.use('/auth', authRoute)

export default router
