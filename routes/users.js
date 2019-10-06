const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//custom
const User = require('../models/User');
const {validateSignup} = require('../functions/validate');

const checkUsername = (requestedUsername) => {
    return User.findOne({username: requestedUsername});
}

const doesEmailExist = (requestedEmail) => {
    return User.findOne({email: requestedEmail});
}

router.post('/register', async (req, res) => {

    const {error} = validateSignup(req.body);
    if (error) return res.status(400).send({error: error.details[0].message});

    //unique username check
    const isUsernameTaken = await checkUsername(req.body.username);
    if (isUsernameTaken) return res.status(409).send({ error: "Username is already in use."});

    try {
        const user = await doesEmailExist(req.body.email);
        if (user) return res.status(409).send({conflict_error: "This email is already in use."});

        //hash password
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();

        const payload = {
            user: {
                id: newUser._id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, 
            {expiresIn: "7 days"}, (err, token) => {
                if (err) throw err;
                res.send({
                    token: token
                });
            });

    } catch (error) {
        res.status(500).send({error: "Oops! Something went wrong."})
    }
})

module.exports = router;