import { gql } from 'apollo-server'

export default gql`
  type User @key(fields: "id") {
    id: ID!
    firstName: String
    username: String
    email: String
    picture: String
    biography: String
    externalUrl: String
    private: Boolean
    verified: Boolean
  }

  input UserInput {
    firstName: String
    email: String
    password: String
  }

  input UpdateUserInput {
    firstName: String
    username: String
    email: String
    password: String
    picture: String
    biography: String
    externalUrl: String
    private: Boolean
  }

  type AuthPayload {
    token: String!
    me: User!
  }

  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User!
  }

  type Mutation {
    signup(input: UserInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    removeUser(id: ID!): User!
  }
`
