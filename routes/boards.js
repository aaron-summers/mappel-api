const express = require("express");
const router = express.Router();
// const validator = require("validator");

//custom import
const verify = require('../middleware/verify');
const User = require('../models/User');
const Board = require('../models/Board');

//create a project with default manager
router.post('/boards', verify, async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).send({error: "Unauthorized request."});

    if (!req.body.title) return res.status(400).send({error: "Bad request. Paramaters missing."});

    try {
        const newBoard = new Board({
            title: req.body.title
        }) 

        newBoard.managers.unshift(req.user.id);
        await newBoard.save();

        res.status(201).send(newBoard);

    } catch (error) {
        res.status(500).send({error: "Could not create board."})
    }
});

module.exports = router;