const { Schema, model } = require('mongoose');

const moviesSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        movieID: {
            type: String,
            required: true
        }
    }
);

const Movies = model('Movies', moviesSchema);

module.exports = Movies;