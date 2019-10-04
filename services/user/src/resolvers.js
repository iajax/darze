const resolvers = {
  Query: {
    allUsers: (_, __, ctx) => ctx.models.User.find({}),
    user: (obj, args, ctx) => ctx.models.User.findOne({ _id: args.id }),
  },

  Mutation: {
    createUser: (_, args, ctx) => ctx.models.User.create(args.input),
    updateUser: (_, args, ctx) =>
      ctx.models.User.findOneAndUpdate(ctx.user._id, args.input, {
        new: true,
      })
        .select('-password')
        .lean()
        .exec(),
    removeProduct: (_, args, ctx) =>
      ctx.models.User.findByIdAndRemove(args._id)
        .lean()
        .exec(),
  },

  User: {
    __resolveReference: (user, ctx) =>
      ctx.models.User.findOne({ _id: user.id }),
  },
};

export default resolvers;
