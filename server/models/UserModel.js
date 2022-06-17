const mongoose = require('mongoose');
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    socketID: {
        type: String,
        required: true,
        unique: true,
    },
    answer: {
        type: String,
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("users", UserSchema);
module.exports = User;