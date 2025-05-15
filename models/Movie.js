const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    slug: String,
    image: String,
    smallImage: String,
    description: String,
    titleYear: String,
});

const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema);

export default Movie;

