const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
    name: String,
    wins: Number,
    losses: Number,
    WLRatio: Number,
});

// model
const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;