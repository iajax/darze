import { gql } from 'apollo-server'

export default gql`
  type Movie @key(fields: "id") {
    id: ID!
    author: User
    backdropPath: String
    imdbId: String
    originalTitle: String
    overview: String
    posterPath: String
    releaseDate: String
    runtime: Int
    slug: String
    status: String
    tagline: String
    title: String
    tmdbId: Int
  }

  input MovieInput {
    author: ID!
    backdropPath: String
    imdbId: String
    originalTitle: String
    overview: String
    posterPath: String
    releaseDate: String
    runtime: Int
    status: String
    tagline: String
    title: String!
    tmdbId: Int
  }

  input UpdateMovieInput {
    backdropPath: String
    originalTitle: String
    overview: String
    posterPath: String
    releaseDate: String
    runtime: Int
    status: String
    tagline: String
    title: String!
  }

  extend type User @key(fields: "id") {
    id: ID! @external
  }

  extend type Query {
    getMovies: [Movie!]!
    getMovie(id: ID!): Movie!
  }

  extend type Mutation {
    createMovie(input: MovieInput!): Movie!
    updateMovie(id: ID!, input: UpdateMovieInput!): Movie!
    removeMovie(id: ID!): Movie!
  }
`
