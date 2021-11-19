const express = require("express");
const router = express.Router();

const User = require('../../models/User');

router.get('/players', (req, res) => {
    User.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error retrieving data');
        })
});

module.exports = router;