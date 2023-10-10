const Category = require("../models/category.js");

async function index(req, res) {
  try {
    const items = await Category.getAllCategories();
    res.status(200).send({ data: items });

  } catch (err) {
    res.status(500).send({ error: err.message })
  }
}





module.exports = {
  index
}
