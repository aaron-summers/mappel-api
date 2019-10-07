const express = require("express");
const router = express.Router();
// const validator = require("validator");

//custom import
const verify = require("../middleware/verify");
const User = require("../models/User");
const Board = require("../models/Board");
const Pin = require("../models/Pin");
const { isManager } = require('../functions/validate');

//create a pin for a board
router.post('/boards/:id/pins', verify, async (req, res) => {

    let board = await Board.findById(req.params.id);

    if (!board) return res.status(404).send({error: "Content not found."})

    try {
        const isAuthorized = isManager(board.managers, req.user.id);
        if (isAuthorized) {
            const newPin = new Pin({
                title: req.body.title,
                board: board._id,
                created: {
                    person: req.user.id
                }
            })

            board.pins.unshift(newPin);
            await board.save();
            await newPin.save();

            res.status(202).send(newPin);
        } else {
            console.log("unauthorized")
        }

    } catch (error) {
        res.status(500).send({error: "Something went wrong."})
    }
});

module.exports = router;
