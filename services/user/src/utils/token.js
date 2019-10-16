// import { AuthenticationError } from 'apollo-server'
import jwt from 'jsonwebtoken'
import moment from 'moment'

export const sign = (
  apiKey,
  userId,
  options = { jwtid: '1' },
  refresh = false
) => {
  const payload = {
    aud: apiKey,
    sub: userId,
    scopes: ['api_read'],
    iat: moment().unix(),
    exp: moment()
      .add(
        !refresh
          ? process.env.TOKEN_LIFETIME
          : process.env.REFRESH_TOKEN_LIFETIME,
        'hours'
      )
      .unix()
  }

  return jwt.sign(payload, process.env.SECRET_KEY, {
    ...options,
    audience: apiKey
  })
}

export const verify = (token, options = { jwtid: '1' }) => {
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY, options.verify)

    if (payload.exp <= moment().unix()) {
      // throw new AuthenticationError('Token has expired')
      throw new jwt.TokenExpiredError('Token has expired')
    }

    return payload
  } catch (err) {
    // throw new AuthenticationError('Invalid token')
    throw new jwt.JsonWebTokenError('Invalid token')
  }
}

export const refresh = token => {
  const payload = verify(token)

  return sign(
    payload.aud,
    payload.sub,
    { verify: { audience: payload.aud }, jwtid: '2' },
    true
  )
}
