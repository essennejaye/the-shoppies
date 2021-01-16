const { gql } = require('apollo-server-express');

const typeDefs = gql `
type Movies {
    _id: ID!
    title: String!
    year: String!
    movieID: String!
}

type Query {
    movies: [Movies]
}

type Mutation {
    saveMovie(title: String!, year: String!, movieID: String!): Movies
    removeMovie(_id: ID!): Movies
}
`;

module.exports = typeDefs;