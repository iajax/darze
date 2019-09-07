const { ApolloServer, gql } = require('apollo-server-micro');

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;

const resolvers = {
  Query: {
    sayHello() {
      return 'Hello World!';
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = apolloServer.createHandler();
