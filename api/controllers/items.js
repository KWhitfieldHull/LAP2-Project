const Item = require("../models/Item.js");

async function index(req, res) {
    try {
        const items = await Item.getAll();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function title(req, res) {
    res.json({
        title: "Item recycling",
        description: "List your reusable items"
    })
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.id);
        const items = await Item.getOneById(id);
        res.status(200).json(items);
    } catch (err) {
        res.status(404).json({ "error": err.message })
    }
}

async function create(req, res) {
    try {
        const data = req.body
        
        const newItem = await Item.create(data);
        res.json(newItem);
    } catch (err) {
        res.status(404).json({ "error": err.message })
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const itemToUpdate = await Item.getOneById(id)
        req.body.name ||= itemToUpdate.name
        req.body.user_id ||= itemToUpdate.user_id
        req.body.image_url ||= itemToUpdate.image_url
        req.body.description ||= itemToUpdate.description
        req.body.category ||= itemToUpdate.category
        const updatedItem = await Item.update(data, id);
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(404).json({ "error": err.message })
    }
}

async function destroy(req, res) {
    try {
        const id = parseInt(req.params.id);
        const item = await Item.getOneById(id);
        const result = await item.destroy(id);
        res.status(204).end();
    } catch (err) {
        res.status(404).json({ "error": err.message })
    }
}
async function upload(req,res){
    try{
        const name =req.files.pic
        const data = req.files.data
        const result = await Item.uploadImage(name, data)
        res.status(201).json(result)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
async function getallimages(req,res){
    try{
        const result = await Item.getallimages()
        res.status(201).json(result)
    }catch(error){
        res.status(404).json({error: error.message})
    }
}

module.exports = {
    index, show, create, destroy, update, title, upload, getallimages
}