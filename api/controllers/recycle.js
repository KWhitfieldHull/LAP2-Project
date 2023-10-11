const Recycle = require("../models/recycle");

async function index(req, res) {
    try {
        const item = req.body;
        const isRecyclable = await Recycle.isRecyclable(item);
        
        res.status(200).send({ data: isRecyclable });
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
}



module.exports = {
    index
}