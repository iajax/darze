import { AuthenticationError } from 'apollo-server'
import jwt from 'jsonwebtoken'

export const sign = (
  payload,
  options = {
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    jwtid: '1'
  }
) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    ...options,
    expiresIn: process.env.JWT_EXPIRES_IN,
    notBefore: '2s'
  })

export const verify = token => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER
    })

    delete payload.iat
    delete payload.exp
    delete payload.nbf
    delete payload.jti

    return payload
  } catch (err) {
    throw new AuthenticationError('Token invalid or expired')
  }
}

export const refresh = token => {
  const payload = verify(token)

  return sign(payload, { jwtid: '2' })
}
