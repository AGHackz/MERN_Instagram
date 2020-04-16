const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: 'no photo'
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }
}, { versionKey: false});

module.exports = mongoose.model('Post', PostSchema, 'posts');