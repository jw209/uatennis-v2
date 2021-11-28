const express = require("express");
const router = express.Router();

const Profile = require('../../models/Profile');

router.get('/profiles', (req, res) => {
    Profile.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error retrieving data');
        })
});

module.exports = router;
