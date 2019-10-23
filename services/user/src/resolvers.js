import { ApolloError } from 'apollo-server'
import validate from './utils/validate'
import schema from './utils/schema'
import { sign } from './utils/token'

const resolvers = {
  Query: {
    getUsers: (_, __, { models }) => models.User.find({}).exec(),
    getUser: validate(schema.get, (_, { id }, { dataSources }) =>
      dataSources.users.findById(id)
    )
  },

  Mutation: {
    signup: validate(schema.signup, async (_, { input }, { models }) => {
      const me = await models.User.create(input)

      const token = await sign({ sub: me._id })

      return { token, me }
    }),
    login: validate(
      schema.login,
      async (_, { email, password }, { models }) => {
        const me = await models.User.findOne({ email }).exec()

        if (!me) {
          throw new ApolloError(`The username does not exist`)
        }

        const match = await me.comparePassword(password)

        if (!match) {
          throw new ApolloError(`Invalid login`)
        }

        const token = await sign({ sub: me._id })

        return { token, me }
      }
    ),
    updateUser: validate(schema.update, (_, { id, input }, { models }) =>
      models.User.findOneAndUpdate({ _id: id }, input, {
        new: true
      })
        .lean()
        .exec()
    ),
    removeUser: validate(schema.remove, (_, { id }, { models }) =>
      models.User.findOneAndRemove({ _id: id })
        .lean()
        .exec()
    )
  },

  User: {
    __resolveReference(user, ctx) {
      return ctx.dataSources.users.findById(user.id)
    }
  }
}

export default resolvers
