const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;
const PlayerstatsSchema = new Schema({
    wins: Number,
    losses: Number,
    wratio: Number
});

// model
const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
