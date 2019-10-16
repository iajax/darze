import { ApolloServer } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import connect from './db'
import UserDataSource from './data'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
// import { authenticate } from './utils/auth';
;(async () => await connect())()

const port = process.env.PORT

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  dataSources: () => ({
    users: new UserDataSource()
  }),
  context: () => ({
    // user: await new authenticate(req),
  })
})

server.listen({ port }).then(({ url }) => console.log(`Server ready at ${url}`))
