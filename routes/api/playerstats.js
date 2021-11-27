const express = require("express");
const router = express.Router();

const Playerstats = require('../../models/Playerstats');

router.get('/playerstats', (req, res) => {
    Playerstats.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error retrieving data');
        })
});

module.exports = router;
