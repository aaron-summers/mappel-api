const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
        max: 512
    },
    description: {
        type: String,
        min: 2,
        max: 1024
    },
    pin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pin'
    },
    completed: {
        type: Boolean,
        default: false
    },
    status: [{
        type: String,
        default: ["Pending", "In Progress", "Done", "Stuck"]
    }],
    priority: [{
        type: String,
        default: ["High", "Medium", "Low"]
    }],
    notes: [{
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    }],
    created_at: {
        type: Date,
        default: Date.now()
    },
    timeline: [{
        type: Date,
        default: [Date.now()]
    }],
    completed_at: {
        type: Date
    }
});

module.exports = Item = mongoose.model('item', itemSchema);