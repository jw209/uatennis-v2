const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;
const PlayerSchema = new Schema({
    rank: Number,
    name: String,
    wins: Number,
    losses: Number,
    wratio: Number
});

// model
const User = mongoose.model('User', PlayerSchema);

module.exports = User;