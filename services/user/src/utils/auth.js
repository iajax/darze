import cuid from 'cuid'
import { verify } from './token'
import User from '../models/user'

export const newApiKey = () => cuid()

export const authenticate = async req => {
  let apiKey = req.headers['x-api-key']
  const authorization = req.headers['authorization']

  if (!apiKey || !authorization) {
    return
  }

  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    const payload = verify(token)
    apiKey = payload.aud
  }

  const user = await User.findOne({ apiKey })
    .select('-password')
    .lean()
    .exec()

  return user
}
