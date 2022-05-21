/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import jwt from 'express-jwt'
import { Request } from 'express'

const jwtPkg = jwt.expressjwt

const isAuthenticated = jwtPkg({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders
})

function getTokenFromHeaders (req: Request): any {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1]
    return token
  }
  return null
}

export default isAuthenticated
