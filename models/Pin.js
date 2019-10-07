const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
    title: {
        type: String, 
        default: "Agenda",
        min: 2,
        max: 512
    },
    description: {
        type: String,
        min: 2,
        max: 1024
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'board'
    },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'item'
        }
    }],
    status: [{
        type: String,
        default: ["Pending", "In Progress", "Done", "Stuck"]
    }],
    comments: [{
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
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
        }},
    timeline: {
        type: [Date]
    },
    completed_at: {
        type: Date
    }
})

module.exports = Pin = mongoose.model('pin', pinSchema);