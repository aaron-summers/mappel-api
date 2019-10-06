const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");

//custom imports
const User = require('../models/User');
const verify = require('../middleware/verify');
const {validateLogin} = require('../functions/validate');

//token verification
router.get('/auth', verify, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -__v");
        if (!user) return res.status(404).send({error: "User not found."});
        res.status(202).send(user);
    } catch (error) {
        res.status(401).send({error: "Unauthorized. Invalid Token."})
    }
});

//login
router.post('/login', async (req, res) => {
    const {error} = validateLogin(res.body);
    if (error) return res.status(400).send({error: error.details[0].message});

    try {
        let user;

        if (req.body.email) {
            user = await User.findOne({email: req.body.email});
        }

        if (req.body.username) {
            user = await User.findOne({username: req.body.username});
        }

        if (!user) return res.status(404).send({error: "Unauthorized. Invalid credentials."});

        const isAuthorized = await bcrypt.compare(req.body.password, user.password);
        if (!isAuthorized) return res.status(401).send({error: "Unauthorized attempt."})

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, 
            {expiresIn: "7 days"}, (err, token) => {
                if (err) throw err;
                res.status(200).send({token: token});
            })

    } catch (error) {
        res.status(500).send({error: "Something went wrong."})
    }
})

//get user
router.get('/users/:id', verify, async (req, res) => {
    try {
        const requestedUser = await User.findById(req.params.id).select("-password -__v");
        if (!requestedUser) return res.status(401).send({error: "Unauthorized request."});

        res.status(200).send(requestedUser);

    } catch (error) {
        res.status(500).send({error: "Something went wrong."})
    }
})

module.exports = router;
