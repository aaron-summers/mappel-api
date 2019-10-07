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
            title: req.body.title,
            description: req.body.description,
            created: {
                person: req.user.id
            }
        }) 

        newBoard.managers.unshift(req.user.id);
        await newBoard.save();

        res.status(201).send(newBoard);

    } catch (error) {
        res.status(500).send({error: "Could not create board."})
    }
});

//edit board title and/or description
router.patch('/boards/:id/edit', verify, async (req, res) => {
    const user = await User.findById(req.user.id);
    let board = await Board.findById(req.params.id);

    if (!user) return res.status(401).send({error: "Unauthorized request."});
    if (!board) return res.status(404).send({error: "Could not locate requested item."});

    try {
        if (!board.managers.find(manager => manager.id == req.user.id)) return res.status(401).send({error: "Insufficient privileges."});

        const fields = {};
        if (req.body.title) fields.title = req.body.title;
        if (req.body.description) fields.description = req.body.description;

        if (board) {
            board = await Board.findOneAndUpdate(
              { _id: req.params.id },
              { $set: fields },
              { new: true }
            ).select("-__v");

            return res.status(202).send({board});
        }

    } catch (error) {
        res.status(500).send({error: "Something went wrong."})
    }
});

//add team member
// router.patch('/:boardId/:userId', verify, async (req, res) => {
//     const user = await User.findById(req.params.userId);
//     let board = await Board.findById(req.params.boardId);

//     if (!user) return res.status(401).send({ error: "Unauthorized request." });
//     if (!board) return res.status(404).send({ error: "Could not locate requested item." });



// });

module.exports = router;