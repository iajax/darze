import Joi from '@hapi/joi'

const objectIdSchema = {
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/, 'mongo id')
}

const emailAndPasswordSchema = {
  email: Joi.string()
    .email()
    .label('Email'),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'min eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    )
    .label('Password')
}

export default {
  get: Joi.object().keys({
    ...objectIdSchema
  }),
  signup: Joi.object().keys({
    input: Joi.object().keys({
      firstName: Joi.string().label('firstName'),
      ...emailAndPasswordSchema
    })
  }),
  login: Joi.object().keys({
    ...emailAndPasswordSchema
  }),
  update: Joi.object().keys({
    ...objectIdSchema,
    input: Joi.object().keys({
      firstName: Joi.string()
        .required()
        .label('firstName'),
      ...emailAndPasswordSchema
    })
  }),
  remove: Joi.object().keys({
    ...objectIdSchema
  }),
  token: Joi.object().keys({
    token: Joi.string().required()
  })
}
