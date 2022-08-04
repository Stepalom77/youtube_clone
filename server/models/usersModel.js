const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    first_name : {
        type: String,
        require : [true, 'Please write your first name']
    },
    last_name : {
        type: String,
        require : [true, 'Please write your last name']
    },
    email: {
        type: String,
        require : [true, 'Please write your email']
    },
    username: {
        type: String,
        require: [true, 'Please write your username']
    },
    password: {
        type: String,
        require : [true, 'Please write your password']
    },
    telephone_number: {
        type: Number,
        require: false
    },
    description: {
        type: Text,
        require: false
    },
    payment_method: {
        type: String,
        require: false
    },
    rating: {
        type: String,
        require: false
    },
    subscriptions: {
        type: String,
        require: false
    },
    subscriptors: {
        type: String,
        require: false
    },
    members: {
        type: String,
        require: false
    },
    liked_videos: {
        type: String,
        require: false
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', usersSchema);