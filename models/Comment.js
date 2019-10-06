const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        min: 2
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    pin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pin'
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item'
    }
});

module.exports = Comment = mongoose.model('comment', commentSchema);