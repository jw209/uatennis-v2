const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
    name: String,
    title: String,
    bio: String
});

// model
const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
