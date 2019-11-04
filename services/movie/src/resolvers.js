import validate from './utils/validate'
import schema from './utils/schema'

export default {
  Query: {
    getMovies: (_, __, { dataSources }) => dataSources.movies.find(),
    getMovie: validate(schema.get, (_, { id }, { dataSources }) =>
      dataSources.movies.findById(id)
    )
  },
  Mutation: {
    createMovie: validate(schema.create, (_, { input }, { dataSources }) =>
      dataSources.movies.create(input)
    ),
    updateMovie: validate(schema.update, (_, { id, input }, { dataSources }) =>
      dataSources.movies.update(id, input)
    ),
    removeMovie: validate(schema.remove, (_, { id }, { dataSources }) =>
      dataSources.movies.remove(id)
    )
  },
  Movie: {
    __resolveReference: ({ id }, { dataSources }) =>
      dataSources.movies.findById(id),
    author: ({ author }) => ({ id: author })
  }
}
