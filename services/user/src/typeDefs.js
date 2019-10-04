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
  input UserInput {
    first_name: String
    username: String
    email: String
    password: String
  }
  input UpdateUserInput {
    first_name: String
    username: String
    email: String
    password: String
  }
  # Queries from user service
  extend type Query {
    # List of all our users
    allUsers: [User]
    # A single user
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    removeProduct(id: ID!): User!
  }
`;

export default schema;
