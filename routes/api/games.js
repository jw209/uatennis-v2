const express = require("express");
const router = express.Router();

const Game = require("../../models/Game");

router.post('/saveGame', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;

    const newGame = new Game(data);
    
    newGame.save((error) => {
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