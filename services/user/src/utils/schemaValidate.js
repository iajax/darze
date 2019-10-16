import { UserInputError } from 'apollo-server'
import { map } from 'lodash'

const schemaValidate = async (args, schema) => {
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
}

export default schemaValidate
