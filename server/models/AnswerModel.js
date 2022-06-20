const mongoose = require('mongoose');
const { Schema } = mongoose

const AnswerSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
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

const Answer = mongoose.model("answers", AnswerSchema);
module.exports = Answer;