const { Movies } = require("../models");

const resolvers = {
  Query: {
    movies: async (parent, args) => {
      const movieData = await Movies.find();
      return movieData;
    },
  },

  Mutation: {
    saveMovie: async (parent, { movieData }) => {
      const updatedMovies = await Movies.updateMany(
        { $push: { savedMovies: movieData } },
        { new: true }
      );
      return updatedMovies;
    },
    removeMovie: async (parent, { movieID }) => {
      const updatedMovies = await Movies.findOneAndUpdate(
        { $pull: { savedMovies: { movieID } } },
        { new: true }
      );
      return updatedMovies;
    },
  },
};
module.exports = resolvers;
