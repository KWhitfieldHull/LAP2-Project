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
async function resetPointsById(req, res){
    try{
        idToReset = parseInt(req.params.id);
        const updatedPoints = await Reward.resetPoints(idToReset)
        res.status(200).json(updatedPoints)
    }catch(error){
        res.status(404).json({error: error.message})
    }
}
//logged in
async function showPointsById(req,res){
    try{
        const id = parseInt(req.params.id)
        const points = await Reward.returnPointsById(id)
        res.status(200).json(points)
    }catch(error){
        res.status(404).json({error: error.message})
    }
}
//logged in, item purchase successful
async function gainPoint(req,res){
    try{
        const id = parseInt(req.params.id)
        let currentPoints =  await (await Reward.returnPointsById(id)).points
        console.log(currentPoints)
        let newPoints = currentPoints + 1;
        const updatedPoints = await Reward.updatePoints(newPoints, id)
        res.status(200).json(updatedPoints)
    }catch(error){
        res.status(404).json({error: error.message})
    }
}
//logged in claim rewards clicked 
async function redeem(req, res){
    try{
        //get user_id, and current_points
        const id = parseInt(req.params.id)
        let currentPoints = await (await Reward.returnPointsById(id)).points
        //identify claim (10/25/35)
        acceptedClaimValues = {"10":10,"25":25, "35":35}
        const claim = parseInt(req.body.value)
        pointsToTake = claim * 10
        //check if currentpoints - claim >0 if yes and claim is valid
        if (claim in acceptedClaimValues && pointsToTake < currentPoints){
            const newPoints = currentPoints - pointsToTake
             //update points
            const updatedPoints = await Reward.updatePoints(newPoints, id)
            //send unique voucher
            const newVoucher = makeVoucher(20)
            console.log(newVoucher)
            res.status(200).send(newVoucher);
            //return success
            //res.status(200).json(updatedPoints)
        }else{
            // not enough points error
            res.status(403).send("The redeemed value is not valid or not enough points to redeem")
        }
    }catch(error){
        res.status(404).json({error: error.message})
    }
}
// create random voucher
function makeVoucher(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
module.exports = {showAllPoints, showPointsById, gainPoint, redeem, resetPointsById}