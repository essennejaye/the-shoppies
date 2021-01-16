const { Movies } = require("../models");

const resolvers = {
  Query: {
    movies: async (parent, args) => {
      const movieData = await Movies.find();
      return movieData;
    },
  },

  Mutation: {
    saveMovie: async (parent, args) => {
      const newMovie = await Movies.create(args);
      return newMovie;
    },

    removeMovie: async (parent, { _id }) => {
      const updatedMovies = await Movies.findOneAndDelete({
        _id: { _id },
      });
      return updatedMovies;
    },
  },
};
module.exports = resolvers;
