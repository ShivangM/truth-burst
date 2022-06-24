const mongoose = require('mongoose');
const { Schema } = mongoose

const RoomSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    host: {
        type: String,
        required: true,
    },
    anonymousPlay: {
        type: Boolean,
        required: true,
        default: false
    },
    rounds: {
        type: Number,
        required: true,
        default: 5
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Room = mongoose.model("rooms", RoomSchema);
module.exports = Room;