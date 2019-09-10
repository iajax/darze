import { ApolloServer, gql } from 'apollo-server-micro';
import { initialize } from './data';
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
});

export default apolloServer.createHandler();
