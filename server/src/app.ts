import express, { Response, Request, NextFunction } from 'express'

import config from './config'

import { } from './error-handling'

import appRoutes from './routes/index.routes'

require('dotenv/config')

require('./db')

const app = express()

config(app)

app.use('/api', appRoutes)

app.all('/', (_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

export default app
