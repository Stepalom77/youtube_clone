const mongoose = require('mongoose');

const videosSchema = mongoose.Schema({
    title: {
            type: String,
            require: [true, 'Please write the title of the video']
    },
    description: {
            type: Text,
            require: [true, 'Please write the title of the video']
    },
    likes: {
        type: Number,
        require: false
    },
    dislikes: {
        type: Number,
        require: false
    },
    video: {
        type: String,
        require: [true, 'Please uploud the video']
    },
    rating: {
        type: String,
        require: [true, 'Please specify the rating of the video']
    },
    users_id: {
        type: Number,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Video', videosSchema);