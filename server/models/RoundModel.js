const mongoose = require('mongoose');
const { Schema } = mongoose

const RoundSchema = new Schema({
    room: {
        type: String,
        required: true,
        unique: true,
    },
    round: {
        type: Number,
        required: true,
        default: 0
    },
    currQuestion: {
        type: String,
        default: ""
    },
    prevQuestions: {
        type: Array,
        default: []
    },
    prevUsers: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Round = mongoose.model("rounds", RoundSchema);
module.exports = Round;