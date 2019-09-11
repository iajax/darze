import { ApolloServer, gql } from 'apollo-server-micro';
import Movie from './models/movie';
import mongooseConnect from './connectors';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const typeDef = gql`
  type Query
`;

try {
  mongooseConnect();
} catch (err) {
  // eslint-disable-next-line no-console
  console.log('Connector error: ', err);
}

const apolloServer = new ApolloServer({
  typeDefs: [typeDef, typeDefs],
  resolvers: [resolvers],
  context: async () => ({ models: { Movie } }),
});

const server = apolloServer.createHandler();

export default server;
