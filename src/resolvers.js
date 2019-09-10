const resolvers = {
  Query: {
    movies: async (obj, args, ctx) => {
      const movie = await ctx.models.Movie.find({});

      return movie;
    },
  },
};

export default resolvers;
