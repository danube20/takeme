import express, { Application } from 'express'
import logger from 'morgan'
import cors from 'cors'

const config = (app: Application): void => {
  app.set('trust proxy', 1)
  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN
    })
  )

  app.use(logger('dev'))

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
}

export default config
