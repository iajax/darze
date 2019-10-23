import Joi from '@hapi/joi'

const objectIdSchema = {
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/, 'mongo id')
}

const emailAndPasswordSchema = {
  email: Joi.string()
    .email()
    .required()
    .label('Email'),
  password: Joi.string()
    .min(3)
    .required()
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
  })
}
