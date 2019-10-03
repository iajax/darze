const resolvers = {
  Query: {
    allUsers: (_, __, ctx) => ctx.models.User.find({}),
    user: (obj, args, ctx) => ctx.models.User.findOne({ _id: args.id }),
  },

  User: {
    __resolveReference: (user, ctx) =>
      ctx.models.User.findOne({ _id: user.id }),
  },
};

export default resolvers;
