const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true 
    },

    name: {
        type: String,
        required: true
    },

    location: String,
    occupation: String,

    description: {
        type: String,
        required: true 
    },

    imageName: {
        type: String,
        required: true
    },

    userImageName: {
        type: String,
        required: true 
    },

    postImageUrl: {
        type: String,
        required: true
    },

    userImageUrl: {
        type: String,
        required: true
    },

    likes: {
        type: Map,
        default: new Map()
    }
}, {timestamps: true} );

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;