const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    type: { type: String },
    name: {
        type: String,
        trim: true,
        required:true
    },
    image: {
        type: String,
        // required:true
    },
    tagline: {
        type: String
    },
    schedule: { type: String },
    description: { type: String },
    moderator: { type: String },
    category: { type: String },
    sub_category: { type: String },
    rigor_rank: { type: String }
})
module.exports = mongoose.model("event", eventSchema);
