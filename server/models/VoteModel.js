const mongoose = require('mongoose');
const { Schema } = mongoose

const VoteSchema = new Schema({
    selected: {
        type: String,
        required: true,
    },
    voter: {
        type: String,
        required: true,
        unique: true
    },
    room: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Vote = mongoose.model("votes", VoteSchema);
module.exports = Vote;