const mongoose = require('mongoose');
const { Schema } = mongoose

const NewsletterSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Newsletter = mongoose.model("newsletters", NewsletterSchema);
module.exports = Newsletter;