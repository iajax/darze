import Joi from '@hapi/joi'

const idSchema = Joi.string()
  .required()
  .pattern(/^[0-9a-fA-F]{24}$/, 'mongo id')

const emailAndPasswordSchema = {
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(3)
    .required()
}

export default {
  get: Joi.object().keys({
    id: idSchema
  }),
  signup: Joi.object().keys({
    input: Joi.object().keys({
      firstName: Joi.string(),
      ...emailAndPasswordSchema
    })
  }),
  login: Joi.object().keys({
    ...emailAndPasswordSchema
  }),
  update: Joi.object().keys({
    id: idSchema,
    input: Joi.object().keys({
      firstName: Joi.string().required(),
      ...emailAndPasswordSchema
    })
  }),
  remove: Joi.object().keys({
    id: idSchema
  })
}
