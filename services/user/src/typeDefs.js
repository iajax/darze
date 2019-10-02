import { gql } from 'apollo-server';

const schema = gql`
  # A user
  type User @key(fields: "id") {
    id: ID!
    # The users' name
    name: String
    # The users' username
    username: String
  }
  # Queries from user service
  extend type Query {
    # List of all our users
    allUsers: [User]
    # A single user
    user(id: ID!): User
  }
`;

export default schema;
