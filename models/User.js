const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;
const PlayerSchema = new Schema({
    rank: Number,
    name: String,
    score: Number,
    wins: Number,
    losses: Number,
    wratio: Number,
    uanetid: String
});

// model
const User = mongoose.model('User', PlayerSchema);

module.exports = User;