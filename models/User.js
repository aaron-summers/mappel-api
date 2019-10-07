const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 2
    },
    displayName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        max: 254,
        min: 6
    },
    password: {
        type: String, 
        required: true,
        min: 6
    },
    contacts: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = User = mongoose.model('user', userSchema);