const express = require("express");
const router = express.Router();

const Comments = require('../../models/Comment');

router.get('/comments', (req, res) => {
    Comments.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error retrieving data');
        })
});

router.post('/saveComment', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;

    const newComment = new Comments(data);
    
    newComment.save((error) => {
        if (error) {
            res.status().json({msg: 'Internal server error'});
        } else {
            res.json({
                msg: 'Data received'
            })
        }
    })
})

module.exports = router;