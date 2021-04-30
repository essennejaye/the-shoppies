const { Schema, model } = require('mongoose');

const moviesSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        movieID: {
            type: String,
            required: true,
            unique: true
        }
    }
);

const Movies = model('Movies', moviesSchema);

module.exports = Movies;