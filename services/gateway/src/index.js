import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import dotenv from 'dotenv';

dotenv.config();

const gateway = new ApolloGateway({
  serviceList: [{ name: 'users', url: process.env.USER_SERVICE_URL }],
});

(async () => {
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({
    schema,
    executor,
  });

  server.listen().then(({ url }) => console.log(`🚀Server ready at ${url}`));
})();
