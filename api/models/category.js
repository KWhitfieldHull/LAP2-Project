const db = require("../database/connect")

class Category {

  constructor({ category_id, category }) {
    this.id = category_id;
    this.category = category;
  }

  static async getAllCategories() {
    const response = await db.query("SELECT * FROM categories_table;");
    if (response.rows.length === 0) {
      throw new Error("No categories available.")
    }
    return response.rows.map(g => new Category(g));
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM categories_table WHERE category_id = $1;", [id]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate category by id.")
    }

    return new Category(response.rows[0]);
  }

  static async getOneByName(name) {
    const response = await db.query("SELECT * FROM categories_table WHERE category = $1;", [name]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate category by name.")
    }

    return new Category(response.rows[0]);
  }
}

module.exports = Category;
