import schemaValidate from './utils/schemaValidate';
import schema from './utils/schema';

const validator = schema => schemaValidate(schema);

const resolvers = {
  Query: {
    getUsers(_, __, ctx) {
      return ctx.dataSources.users.find();
    },
    getUser(_, args, ctx) {
      return ctx.dataSources.users.findById(args.id);
    },
  },

  Mutation: {
    async createUser(_, args, ctx) {
      await validator(schema);

      console.log('paso');

      return ctx.dataSources.users.create(args.input);
    },
    updateUser(_, args, ctx) {
      return ctx.dataSources.users.update(args.id, args.input);
    },
    removeUser(_, args, ctx) {
      return ctx.dataSources.users.remove(args.id);
    },
  },

  User: {
    __resolveReference(user, ctx) {
      return ctx.dataSources.users.findById(user.id);
    },
  },
};

export default resolvers;
