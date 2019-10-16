import validator from './utils/validator'
import schema from './utils/schema'

const resolvers = {
  Query: {
    getUsers(_, __, ctx) {
      return ctx.dataSources.users.find()
    },
    async getUser(_, args, ctx) {
      await validator(args, schema.get)

      return ctx.dataSources.users.findById(args.id)
    }
  },

  Mutation: {
    async signup(_, args, ctx) {
      await validator(args, schema.signup)

      return ctx.dataSources.users.signup(args.input)
    },
    async login(_, args, ctx) {
      await validator(args, schema.login)

      return ctx.dataSources.users.login(args.email, args.password)
    },
    async updateUser(_, args, ctx) {
      await validator(args, schema.update)

      return ctx.dataSources.users.update(args.id, args.input)
    },
    async removeUser(_, args, ctx) {
      await validator(args, schema.remove)

      return ctx.dataSources.users.remove(args.id)
    },
    async newToken(_, args, ctx) {
      await validator(args, schema.token)

      return ctx.dataSources.users.newToken(args.token)
    }
  },

  User: {
    __resolveReference(user, ctx) {
      return ctx.dataSources.users.findById(user.id)
    }
  }
}

export default resolvers
