import { ApolloServer, gql } from 'apollo-server-micro';
import { initialize, Movie } from './data';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const typeDef = gql`
  type Query
`;

try {
  initialize();
} catch (err) {
  console.log('MongoConnector error: ', err);
}

const apolloServer = new ApolloServer({
  typeDefs: [typeDef, typeDefs],
  resolvers: [resolvers],
  context: async () => ({ models: { Movie } }),
});

const server = apolloServer.createHandler();

export default server;
