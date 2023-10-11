const Bid = require("../models/bids");

async function index(req, res) {
    try {
        const bids = await Bid.getAllBids();
        res.status(200).send({ data: bids });
    } catch (err) {
        res.status(500).send({ error: err.message })
    }   
}
async function showItemBid(req, res) {
    try {
        const item_id = parseInt(req.params.itemid);
        const highestBidOBJ = await Bid.getBidByItemId(item_id);
        res.status(200).send({data: highestBidOBJ});
    } catch (err) {
        res.status(404).send({ "error": err.message })
    }
}
async function showUserBid(req, res) {
    try {
        const user_id = parseInt(req.params.userid);
        const bidsByUser = await Bid.getBidByUserId(user_id);
        res.status(200).send({bidsByUser});
    } catch (err) {
        res.status(404).send({ "error": err.message })
    }
}
async function bidHandler(req,res){
    try{
    //get item_id, user_id, proposed bid
    item_id = req.body.item_id
    proposed_bid = req.body.proposed_bid
    user_id = req.body.user_id
    console.log("hi", proposed_bid)
    // bid has to be more than 0
    if (proposed_bid<0){
        res.status(403).send("Bid has to be more than 0!")
    }
    currentBid = await (await Bid.getBidByItemId(item_id)).highest_bid
    if (proposed_bid>currentBid){
        //patch
        updatedBid = await Bid.updateBid(user_id, item_id, proposed_bid)
        res.status(200).send(updatedBid)
    }
    else{
        res.status(403).send("Bid needs to be higher than max Bid!")
    }
    }catch(error){
        res.status(404).send({"error": error.message})
    }   
}
module.exports={index, showItemBid, showUserBid, bidHandler}