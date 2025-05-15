const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    rating: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    movieSlug: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
