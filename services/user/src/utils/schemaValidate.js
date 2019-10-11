import { UserInputError } from 'apollo-server';
import { map } from 'lodash';

const schemaValidate = async (schema, args) => {
  try {
    await schema.validateAsync(args, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: false,
    });
  } catch (err) {
    const invalidArgs = await map(err.details, ({ message, type }) => ({
      message: message.replace(/['"]/g, ''),
      type,
    }));

    throw new UserInputError('Validation errors', { invalidArgs });
  }
};

export default schemaValidate;
