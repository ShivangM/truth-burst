const mongoose = require('mongoose');
const { Schema } = mongoose

const ContactSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model("contacts", ContactSchema);
module.exports = Contact;