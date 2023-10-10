const Recycle = require("../models/recycle");

async function index(req, res) {
    try {
        
        const isRecyclable = await Recycle.isRecyclable();
        
        res.status(200).send({ data: isRecyclable });
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}



module.exports = {
    index
}