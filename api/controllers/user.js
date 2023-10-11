const bcrypt = require('bcrypt');

const User = require('../models/user');
const Token = require("../models/token");


async function register(req, res) {
    try {
        const data = req.body;
        const saltRounds = 10;
        const hash = await bcrypt.hash(data["password"], saltRounds)
        data["password"] = hash
        const result = await User.create(data)
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
};
async function login(req, res) {
    const data = req.body;
    try {
        const user = await User.getOneByUsername(data.username)
        const authenticated = await bcrypt.compare(data.password, user["password"])
        
        if (!authenticated) {
            throw new Error("Incorrect Details")
        }
        else {
            const token = await Token.create(user.id)
            
            res.status(200).send({authenticated: true, token: token.token})
        }

    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

async function showUserByToken(req, res) {
    try {
        const data = req.body
        const user = await Token.getUserByToken(data)
        res.status(201).send({ user })
      } catch (err) {
        res.status(400).send({ "error": err.message })
      }
}


async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const user = await User.getOneById(id);
        const result = await user.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

module.exports = {
    register, login, showUserByToken, update
}                           