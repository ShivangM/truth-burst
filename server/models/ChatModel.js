const mongoose = require('mongoose');
const { Schema } = mongoose

const ChatSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.model("chats", ChatSchema);
module.exports = Chat;