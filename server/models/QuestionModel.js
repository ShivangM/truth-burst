const mongoose = require('mongoose');
const { Schema } = mongoose

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
});

const Question = mongoose.model("questions", QuestionSchema);
module.exports = Question;