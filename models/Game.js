const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;
const GameSchema = new Schema({
    userfname: String,
    oppfname: String,
    opplname: String,
    set1you: String,
    set1opp: String,
    set2you: String,
    set2opp: String,
    set3you: String,
    set3opp: String,
    date: String
});

// model
const Game = mongoose.model('Game', GameSchema);

module.exports = Game;