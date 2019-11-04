import { UserInputError } from 'apollo-server'
import { map } from 'lodash'

export default (schema, next) => async (root, args, context, info) => {
  try {
    await schema.validateAsync(args)
  } catch (err) {
    const invalidArgs = await map(err.details, ({ message, type }) => ({
      message,
      type
    }))

    throw new UserInputError('Argument validation errors', {
      invalidArgs
    })
  }

  return next(root, args, context, info)
}
