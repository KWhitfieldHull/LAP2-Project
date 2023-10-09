const bcrypt = require('bcrypt');

const User = require('../models/user');
const Token = require("../models/token");

const Reward = require('../models/point');

//logged in and admin
async function showAllPoints(req, res){
    try{
        const allUserPoints = await Reward.getAll();
        res.status(200).json(allUserPoints);
    }catch(error){
        res.status(500).json({ error: error.message})
    }
}

//logged in
async function showPointsById(req,res){
    try{
        const id = parseInt(req.params.id)
        const points = await Reward.returnPointsById(id)
        res.status(200).json(points)
    }catch(error){
        res.status(404).json({"error": error.message})
    }
}
module.exports = {showAllPoints, showPointsById, }