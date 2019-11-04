import { ApolloServer } from 'apollo-server'
import { buildFederatedSchema } from '@apollo/federation'
import { connect, UserDataSource, User } from './db'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { getUser } from './helpers/auth'
;(async () => await connect())()

const port = process.env.PORT

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  dataSources: () => ({
    users: new UserDataSource()
  }),
  context: async ({ req }) => {
    const token = req.headers.authorization || ''
    const user = await getUser(token)

    return { user, models: { User } }
  }
})

server.listen({ port }).then(({ url }) => console.log(`Server ready at ${url}`))
