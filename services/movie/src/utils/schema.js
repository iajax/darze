import Joi from '@hapi/joi'

const idSchema = Joi.string()
  .required()
  .pattern(/^[0-9a-fA-F]{24}$/, 'mongo id')

const inputSchema = {
  backdropPath: Joi.string(),
  imdbId: Joi.string(),
  originalTitle: Joi.string(),
  overview: Joi.string(),
  posterPath: Joi.string(),
  releaseDate: Joi.string(),
  runtime: Joi.number(),
  status: Joi.string(),
  tagline: Joi.string(),
  title: Joi.string().required()
}

export default {
  get: Joi.object().keys({
    id: idSchema
  }),
  create: Joi.object().keys({
    input: Joi.object().keys({
      author: idSchema,
      ...inputSchema,
      tmdbId: Joi.number()
    })
  }),
  update: Joi.object().keys({
    id: idSchema,
    input: Joi.object().keys({
      ...inputSchema
    })
  }),
  remove: Joi.object().keys({
    id: idSchema
  })
}
