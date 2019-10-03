import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import mongooseConnect from './connectors';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

import User from './models/user';

(async () => {
  await mongooseConnect();
})();

const { PORT } = process.env;

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: req => ({
    ...req,
    models: { User },
  }),
});

server.listen(PORT).then(({ url }) => console.log(`Server ready at ${url}`));
