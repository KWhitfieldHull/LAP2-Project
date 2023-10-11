const Item = require("../models/Item.js");

async function index(req, res) {
    try {
        const items = await Item.getAll();
        res.status(200).send({ data: items });

    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

async function title(req, res) {
    res.json({
        title: "Item recycling",
        description: "List your reusable items"
    })
}



const create = async (req, res) => {
    try {
      const data = req.body
      const newItem = await Item.create(data)
      res.status(201).send({ data: newItem })
    } catch (err) {
      res.status(400).send({ "error": err.message })
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

module.exports = {
    index, show, create, destroy, update, title
}