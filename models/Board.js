const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    description: {
        type: String,
        max: 1024
    },
    pins: [{
        pin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pin'
        }
    }],
    managers: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    team: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    created: {
        person: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        datetime: {
            type: Date,
            default: Date.now()
        }
    }
})

module.exports = board = mongoose.model('board', boardSchema);