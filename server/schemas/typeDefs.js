const { gql } = require('apollo-server-express');

const typeDefs = gql `
type Movies {
    _id: ID!
    title: String!
    year: Int!
    movieID: String!
}
input MovieInput {
    _id: ID!
    title: String!
    year: Int!
    movieID: String!
}

type Query {
    movies: Movies
}

type Mutation {
    saveMovie(movieData: MovieInput!): Movies
}
`;

module.exports = typeDefs;