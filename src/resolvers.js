const resolvers = {
  Query: {
    movies: async (_, __, ctx) => {
      const movie = await ctx.models.Movie.find({});

      return movie;
    },
  },
};

export default resolvers;
