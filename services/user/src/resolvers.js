import validate from './utils/validate'
import schema from './utils/schema'

export default {
  Query: {
    getUsers: (_, __, { dataSources }) => dataSources.users.find(),
    getUser: validate(schema.get, (_, { id }, { dataSources }) =>
      dataSources.users.findById(id)
    )
  },
  Mutation: {
    updateUser: validate(schema.update, (_, { id, input }, { dataSources }) =>
      dataSources.users.update(id, input)
    ),
    removeUser: validate(schema.remove, (_, { id }, { dataSources }) =>
      dataSources.users.remove(id)
    ),
    signup: validate(schema.signup, (_, { input }, { dataSources }) =>
      dataSources.users.create(input)
    ),
    login: validate(schema.login, (_, { email, password }, { dataSources }) =>
      dataSources.users.login(email, password)
    )
  },
  User: {
    __resolveReference: ({ id }, { dataSources }) =>
      dataSources.users.findById(id)
  }
}
