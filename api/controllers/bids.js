const Bid = require("../models/bids");

async function index(req, res) {
    try {
        const bids = await Bid.getAllBids();
        res.status(200).send({ data: bids });
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}