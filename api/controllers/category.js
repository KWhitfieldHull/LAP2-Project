const Category = require("../models/category.js");

async function index(req, res) {
  try {
    const items = await Category.getAllCategories();
    res.status(200).send({ data: items });

  } catch (err) {
    res.status(500).send({ 'error': err.message })
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const items = await Category.getOneById(id);
    res.status(200).send({ data: items });
  } catch (err) {
    res.status(404).send({ "error": err.message })
  }
}




module.exports = {
  index, show
}
