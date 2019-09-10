import { Data, Movie } from './data';

const data = new Data(Movie);

const resolvers = {
  Query: {
    movies: (obj, args, ctx) => data.find({}),
  },
};

export default resolvers;
