import { AuthenticationError } from 'apollo-server'
import { verify } from '../utils/token'
import { User } from '../db'

export const getUser = tokenWithBearer => {
  if (!tokenWithBearer) {
    return
  }

  const token = tokenWithBearer.replace('Bearer ', '')
  const payload = verify(token)

  return User.findOne({ _id: payload.sub })
    .select('-password')
    .lean()
}

export const authenticated = next => (root, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError('Must authenticate')
  }

  return next(root, args, context, info)
}

export const authorized = (role, next) => (root, args, context, info) => {
  if (!context.user.role !== role) {
    throw new AuthenticationError(`You must have ${role}`)
  }

  return next(root, args, context, info)
}
