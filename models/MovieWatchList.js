const mongoose = require('mongoose');

const movieWatchListSchema = new mongoose.Schema({
    title: String,
    image: String,
    username: String,
    imdbID: String
});

const MovieWatchList = mongoose.models.MovieWatchList || mongoose.model('MovieWatchList', movieWatchListSchema);

export default MovieWatchList;

