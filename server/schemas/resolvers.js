const { Movies } = require('../models');

const resolvers = {
    Query: {
        movies: async (parent, args) => {
            const movieData = await Movies.findOne();
            return movieData;
        }
    }
}
module.exports = resolvers;