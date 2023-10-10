const db = require("../database/connect_user")

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
}

module.exports = Category;
