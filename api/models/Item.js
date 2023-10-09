const db = require("../database/connect_user")


class Item {

    constructor({ item_id, name, category, user_id, image_url, description  }) {
        this.id = item_id;
        this.name = name;
        this.user_id = user_id;
        this.image_url = image_url;
        this.category = category;
        this.description = description;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM items_table ORDER BY name;");
        if (response.rows.length === 0) {
            throw new Error("No items available.")
        }
        return response.rows.map(g => new Item(g));
    }


    static async getOneById(id) {
        const response = await db.query("SELECT * FROM items_table WHERE item_id = $1;", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate item.")
        }
        return new Item(response.rows[0]);
    }

    static async getOneByCategory(category) {
        const response = await db.query("SELECT * FROM items_table WHERE category = $1;", [category]);
        if (response.rows.length === 0) {
            throw new Error("No items available.")
        }
        return response.rows.map(g => new Item(g));
    }

    static async create(data) {
        const { name, user_id, image_url, description, category } = data;
        const response = await db.query('INSERT INTO items_table (name, user_id, image_url, description, category) VALUES ($1, $2, $3 ,$4, $5) RETURNING *;', [name, user_id, image_url, description, category]);
        console.log(response)
        const itemId = response.rows[0].item_id;
        console.log(itemId)
        const newItem = await Item.getOneById(itemId);
        return new Item(newItem)
    }

    // async update(data) {

    //     const response = await db.query("UPDATE item SET votes = $1 WHERE snack_id = $2 RETURNING snack_id, votes;",
    //         [newVotes, this.id]);
    //     if (response.rows.length != 1) {
    //         throw new Error("Unable to update votes.")
    //     }
    //     return new Item(response.rows[0]);
    // }

    async destroy() {
        const response = await db.query('DELETE FROM items_table WHERE item_id = $1 RETURNING *;', [this.id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete item.")
        }
        return new Item(response.rows[0]);
    }
}

module.exports = Item;
