import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Movie {
    title: String
    description: String
  }

  extend type Query {
    movies: [Movie]
  }
`;

export default typeDefs;
