import { ApolloServer } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import { connect, MovieDataSource, Movie } from './db'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
;(async () => await connect())()

const port = process.env.PORT

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  dataSources: () => ({
    movies: new MovieDataSource()
  }),
  context: () => {
    return { models: { Movie } }
  }
})

server.listen({ port }).then(({ url }) => console.log(`Server ready at ${url}`))
