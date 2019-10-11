import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import connect from './db';
import UserDataSource from './data';
import User from './models/user';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

(async () => await connect())();

const port = process.env.PORT;

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  dataSources: () => ({
    users: new UserDataSource(),
  }),
  context: () => ({
    models: { user: User },
  }),
});

server
  .listen({ port })
  .then(({ url }) => console.log(`Server ready at ${url}`));
